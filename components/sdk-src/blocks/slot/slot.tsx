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

export type DropzoneProps = BuilderDataProps & {
  name: string;
  attributes: any;
};
import Blocks from "../../components/blocks/blocks";
import { deoptSignal } from "../../functions/deopt";
import type { BuilderBlock } from "../../types/builder-block";
import type { BuilderDataProps } from "../../types/builder-props";

function Slot(props: DropzoneProps) {
  return (
    <View
      style={{
        pointerEvents: "auto",
      }}
      {...(!props.builderContext.context?.symbolId && {
        "builder-slot": props.name,
      })}
    >
      <Blocks
        parent={props.builderContext.context?.symbolId as string}
        path={`symbol.data.${props.name}`}
        context={props.builderContext}
        blocks={props.builderContext.rootState?.[props.name] as BuilderBlock[]}
      />
    </View>
  );
}

export default Slot;
