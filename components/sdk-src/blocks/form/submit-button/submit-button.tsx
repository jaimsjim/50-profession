import * as React from "react";
import BaseText from "../../blocks/BaseText";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";

/**
 * This import is used by the Svelte SDK. Do not remove.
 */

export interface ButtonProps {
  attributes?: any;
  text?: string;
}

import { filterAttrs } from "../../helpers";
import { setAttrs } from "../../helpers";

function SubmitButton(props: ButtonProps) {
  return (
    <View type="submit" {...{}} {...props.attributes}>
      <BaseText>{props.text}</BaseText>
    </View>
  );
}

export default SubmitButton;
