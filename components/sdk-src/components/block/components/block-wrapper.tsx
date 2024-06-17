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

type BlockWrapperProps = {
  Wrapper: string;
  block: BuilderBlock;
  context: BuilderContextInterface;
  linkComponent: any;
  children?: any;
};

/**
 * This component renders a block's wrapper HTML element (from the block's `tagName` property).
 */

import type { BuilderContextInterface } from "../../../context/types";
import { getBlockActions } from "../../../functions/get-block-actions";
import { getBlockProperties } from "../../../functions/get-block-properties";
import type { BuilderBlock } from "../../../types/builder-block";
import DynamicRenderer from "../../dynamic-renderer/dynamic-renderer";

function BlockWrapper(props: BlockWrapperProps) {
  return (
    <DynamicRenderer
      TagName={props.Wrapper}
      attributes={getBlockProperties({
        block: props.block,
        context: props.context,
      })}
      actionAttributes={getBlockActions({
        block: props.block,
        rootState: props.context.rootState,
        rootSetState: props.context.rootSetState,
        localState: props.context.localState,
        context: props.context.context,
        stripPrefix: true,
      })}
    >
      {props.children}
    </DynamicRenderer>
  );
}

export default BlockWrapper;
