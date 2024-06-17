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
import type { FragmentProps } from "./fragment.types";

function FragmentComponent(props: FragmentProps) {
  return <View>{props.children}</View>;
}

export default FragmentComponent;
