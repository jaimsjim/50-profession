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

export type BlocksWrapperProps = {
  blocks: BuilderBlock[] | undefined;
  parent: string | undefined;
  path: string | undefined;
  styleProp: Record<string, any> | undefined;
  /**
   * The element that wraps each list of blocks. Defaults to a `div` element ('ScrollView' in React Native).
   */
  BlocksWrapper: any;
  /**
   * Additonal props to pass to `blocksWrapper`. Defaults to `{}`.
   */
  BlocksWrapperProps: any;
  children?: any;
};
import { isEditing } from "../../functions/is-editing";
import type { BuilderBlock } from "../../types/builder-block";

function BlocksWrapper(props: BlocksWrapperProps) {
  function className() {
    return "builder-blocks" + (!props.blocks?.length ? " no-blocks" : "");
  }

  function onClick() {
    if (isEditing() && !props.blocks?.length) {
      window.parent?.postMessage(
        {
          type: "builder.clickEmptyBlocks",
          data: {
            parentElementId: props.parent,
            dataPath: props.path,
          },
        },
        "*"
      );
    }
  }

  function onMouseEnter() {
    if (isEditing() && !props.blocks?.length) {
      window.parent?.postMessage(
        {
          type: "builder.hoverEmptyBlocks",
          data: {
            parentElementId: props.parent,
            dataPath: props.path,
          },
        },
        "*"
      );
    }
  }

  return (
    <props.BlocksWrapper
      builder-path={props.path}
      builder-parent-id={props.parent}
      {...{
        dataSet: {
          class: className(),
        },
      }}
      style={{
        ...styles.propsBlocksWrapper1,
        ...props.styleProp,
      }}
      onPress={(event) => onClick()}
      onMouseEnter={(event) => onMouseEnter()}
      onKeyPress={(event) => onClick()}
      {...props.BlocksWrapperProps}
    >
      {props.children}
    </props.BlocksWrapper>
  );
}

const styles = StyleSheet.create({
  propsBlocksWrapper1: { display: "flex", flexDirection: "column" },
});

export default BlocksWrapper;
