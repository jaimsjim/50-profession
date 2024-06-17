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

export interface FormSelectProps {
  options?: {
    name?: string;
    value: string;
  }[];
  attributes?: any;
  name?: string;
  value?: string;
  defaultValue?: string;
}

import { isEditing } from "../../../functions/is-editing";
import { filterAttrs } from "../../helpers";
import { setAttrs } from "../../helpers";

function SelectComponent(props: FormSelectProps) {
  return (
    <View
      {...{}}
      {...props.attributes}
      value={props.value}
      key={
        isEditing() && props.defaultValue ? props.defaultValue : "default-key"
      }
      defaultValue={props.defaultValue}
      name={props.name}
    >
      {props.options?.map((option, index) => (
        <View key={`${option.name}-${index}`} value={option.value}>
          <BaseText>{option.name || option.value}</BaseText>
        </View>
      ))}
    </View>
  );
}

export default SelectComponent;
