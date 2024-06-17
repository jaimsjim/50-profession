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

export interface DynamicDivProps {
  children?: any;
  attributes: any;
  actionAttributes: any;
  BlockWrapperProps: any;
  builderPath: any;
  builderParentId: any;
  BlocksWrapperProps: any;
  contentWrapperProps: any;
  builderModel: any;
  ref: any;
}

function DynamicDiv(props: DynamicDivProps) {
  return <View>{props.children}</View>;
}

export default DynamicDiv;
