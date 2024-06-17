import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import ContentVariants from "../../components/content-variants/index";
import type { BuilderContent } from "../../types/builder-content";
import { filterAttrs } from "../helpers";
import DynamicDiv from "../../components/dynamic-div";
import { getClassPropName } from "../../functions/get-class-prop-name";
import type { Nullable } from "../../types/typescript";
import { setAttrs } from "../helpers";
import { fetchSymbolContent } from "./symbol.helpers";
import type { SymbolProps } from "./symbol.types";

function Symbol(props: SymbolProps) {
  function blocksWrapper() {
    return View;
  }

  function contentWrapper() {
    return View;
  }

  function className() {
    return [
      ...[],
      "builder-symbol",
      props.symbol?.inline ? "builder-inline-symbol" : undefined,
      props.symbol?.dynamic || props.dynamic
        ? "builder-dynamic-symbol"
        : undefined,
    ]
      .filter(Boolean)
      .join(" ");
  }

  const [contentToUse, setContentToUse] = useState(() => props.symbol?.content);

  function setContent() {
    if (contentToUse) return;
    fetchSymbolContent({
      symbol: props.symbol,
      builderContextValue: props.builderContext,
    }).then((newContent) => {
      if (newContent) {
        setContentToUse(newContent);
      }
    });
  }

  useEffect(() => {}, []);

  useEffect(() => {
    setContent();
  }, [props.symbol]);

  return (
    <View
      {...{}}
      {...props.attributes}
      {...{
        dataSet: {
          class: className(),
        },
      }}
    >
      <ContentVariants
        isNestedRender
        apiVersion={props.builderContext.apiVersion}
        apiKey={props.builderContext.apiKey!}
        context={{
          ...props.builderContext.context,
          symbolId: props.builderBlock?.id,
        }}
        customComponents={Object.values(props.builderComponents)}
        data={{
          ...props.symbol?.data,
          ...props.builderContext.localState,
          ...contentToUse?.data?.state,
        }}
        model={props.symbol?.model}
        content={contentToUse}
        linkComponent={props.builderLinkComponent}
        blocksWrapper={blocksWrapper()}
        contentWrapper={contentWrapper()}
      />
    </View>
  );
}

export default Symbol;
