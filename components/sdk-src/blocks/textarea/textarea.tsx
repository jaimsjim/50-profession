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

/**
 * This import is used by the Svelte SDK. Do not remove.
 */

export interface TextareaProps {
  attributes?: any;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

import { filterAttrs } from "../helpers";
import { setAttrs } from "../helpers";

function Textarea(props: TextareaProps) {
  return (
    <View
      {...{}}
      {...props.attributes}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
    />
  );
}

export default Textarea;
