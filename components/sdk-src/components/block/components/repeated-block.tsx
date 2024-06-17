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

type Props = Omit<BlockProps, "context"> & {
  repeatContext: BuilderContextInterface;
};
import BuilderContext from "../../../context/builder.context";
import type { BuilderContextInterface } from "../../../context/types";
import type { BlockProps } from "../block";
import Block from "../block";

function RepeatedBlock(props: Props) {
  const [store, setStore] = useState(() => props.repeatContext);

  return (
    <BuilderContext.Provider value={store}>
      <Block
        block={props.block}
        context={store}
        registeredComponents={props.registeredComponents}
        linkComponent={props.linkComponent}
      />
    </BuilderContext.Provider>
  );
}

export default RepeatedBlock;
