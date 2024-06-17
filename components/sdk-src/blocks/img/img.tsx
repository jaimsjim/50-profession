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

export interface ImgProps {
  attributes?: any;
  imgSrc?: string; // TODO(misko): I think this is unused
  image?: string;
  altText?: string;
  backgroundSize?: "cover" | "contain";
  backgroundPosition?:
    | "center"
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
}

import { isEditing } from "../../functions/is-editing";
import { filterAttrs } from "../helpers";
import { setAttrs } from "../helpers";

function ImgComponent(props: ImgProps) {
  return (
    <View
      style={{
        objectFit: props.backgroundSize || "cover",
        objectPosition: props.backgroundPosition || "center",
      }}
      key={(isEditing() && props.imgSrc) || "default-key"}
      alt={props.altText}
      src={props.imgSrc || props.image}
      {...{}}
      {...props.attributes}
    />
  );
}

export default ImgComponent;
