import BaseText from "../../blocks/BaseText";
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
import DynamicRenderer from "../../components/dynamic-renderer/dynamic-renderer";
import { getClassPropName } from "../../functions/get-class-prop-name";
import { filterAttrs } from "../helpers";
import type { ButtonProps } from "./button.types";

function Button(props: ButtonProps) {
  function attrs() {
    return {
      ...props.attributes,
      [getClassPropName()]: `${props.link ? "" : "builder-button"} ${
        props.attributes[getClassPropName()] || ""
      }`,
      ...(props.link
        ? {
            href: props.link,
            target: props.openLinkInNewTab ? "_blank" : undefined,
            role: "link",
          }
        : {
            role: "button",
          }),
    };
  }

  return (
    <DynamicRenderer
      attributes={attrs()}
      TagName={
        props.link
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            props.builderLinkComponent || BaseText
          : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            BaseText
      }
      actionAttributes={{}}
    >
      <Text>{props.text}</Text>
    </DynamicRenderer>
  );
}

export default Button;
