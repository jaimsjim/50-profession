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
import { useState, useContext } from "react";
import { wrapComponentRef } from "../../../content/wrap-component-ref";
import Block from "../../block";
import InteractiveElement from "../interactive-element";
import type { ComponentProps } from "./component-ref.helpers";
import { getWrapperProps } from "./component-ref.helpers";
import BuilderContext from "../../../../context/builder.context";

function ComponentRef(props: ComponentProps) {
  const [Wrapper, setWrapper] = useState(() =>
    props.isInteractive ? InteractiveElement : props.componentRef
  );

  return (
    <BuilderContext.Provider
      value={{
        content: props.context.content,
        rootState: props.context.rootState,
        localState: props.context.localState,
        context: props.context.context,
        apiKey: props.context.apiKey,
        componentInfos: props.context.componentInfos,
        inheritedStyles: props.context.inheritedStyles,
        apiVersion: props.context.apiVersion,
      }}
    >
      {props.componentRef ? (
        <Wrapper
          {...getWrapperProps({
            componentOptions: props.componentOptions,
            builderBlock: props.builderBlock,
            context: props.context,
            componentRef: props.componentRef,
            linkComponent: props.linkComponent,
            includeBlockProps: props.includeBlockProps,
            isInteractive: props.isInteractive,
            contextValue: props.context,
          })}
        >
          {props.blockChildren?.map((child) => (
            <Block
              key={child.id}
              block={child}
              context={props.context}
              registeredComponents={props.registeredComponents}
              linkComponent={props.linkComponent}
            />
          ))}
        </Wrapper>
      ) : null}
    </BuilderContext.Provider>
  );
}

export default ComponentRef;
