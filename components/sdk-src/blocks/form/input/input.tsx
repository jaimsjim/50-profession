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

export interface FormInputProps {
  type?: string;
  attributes?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}

import { isEditing } from "../../../functions/is-editing";
import { filterAttrs } from "../../helpers";
import { setAttrs } from "../../helpers";

function FormInputComponent(props: FormInputProps) {
  return (
    <View
      {...{}}
      {...props.attributes}
      key={
        isEditing() && props.defaultValue ? props.defaultValue : "default-key"
      }
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      required={props.required}
    />
  );
}

export default FormInputComponent;
