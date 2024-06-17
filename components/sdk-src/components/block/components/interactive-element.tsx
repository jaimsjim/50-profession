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

export type InteractiveElementProps = {
  Wrapper: any;
  block: BuilderBlock;
  context: BuilderContextInterface;
  wrapperProps: Dictionary<any>;
  includeBlockProps: boolean;
  children?: any;
};
import type { BuilderContextInterface } from "../../../context/types";
import { getBlockActions } from "../../../functions/get-block-actions";
import { getBlockProperties } from "../../../functions/get-block-properties";
import type { BuilderBlock } from "../../../types/builder-block";
import type { Dictionary } from "../../../types/typescript";

function InteractiveElement(props: InteractiveElementProps) {
  function attributes() {
    return props.includeBlockProps
      ? {
          ...getBlockProperties({
            block: props.block,
            context: props.context,
          }),
          ...getBlockActions({
            block: props.block,
            rootState: props.context.rootState,
            rootSetState: props.context.rootSetState,
            localState: props.context.localState,
            context: props.context.context,
          }),
        }
      : {};
  }

  return (
    <props.Wrapper {...props.wrapperProps} attributes={attributes()}>
      {props.children}
    </props.Wrapper>
  );
}

export default InteractiveElement;
