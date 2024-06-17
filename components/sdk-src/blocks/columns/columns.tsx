import BaseText from "../../blocks/BaseText";
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
import { useState } from "react";

type CSSVal = string | number;
import Blocks from "../../components/blocks/blocks";
import DynamicDiv from "../../components/dynamic-div";
import DynamicRenderer from "../../components/dynamic-renderer/dynamic-renderer";
import InlinedStyles from "../../components/inlined-styles";
import type { SizeName } from "../../constants/device-sizes";
import { getSizesForBreakpoints } from "../../constants/device-sizes";
import { TARGET } from "../../constants/target";
import { deoptSignal } from "../../functions/deopt";
import { getClassPropName } from "../../functions/get-class-prop-name";
import { mapStyleObjToStrIfNeeded } from "../../functions/get-style";
import type { Dictionary } from "../../types/typescript";
import type { Column, ColumnProps } from "./columns.types";
import { getColumnsClass } from "./helpers";

function Columns(props: ColumnProps) {
  const [gutterSize, setGutterSize] = useState(() =>
    typeof props.space === "number" ? props.space || 0 : 20
  );

  const [cols, setCols] = useState(() => props.columns || []);

  const [stackAt, setStackAt] = useState(
    () => props.stackColumnsAt || "tablet"
  );

  function getTagName(column: Column) {
    return column.link ? props.builderLinkComponent || BaseText : View;
  }

  function getWidth(index: number) {
    return cols[index]?.width || 100 / cols.length;
  }

  function getColumnCssWidth(index: number) {
    const subtractWidth = (gutterSize * (cols.length - 1)) / cols.length;
    return `calc(${getWidth(index)}% - ${subtractWidth}px)`;
  }

  function getTabletStyle({
    stackedStyle,
    desktopStyle,
  }: {
    stackedStyle: CSSVal;
    desktopStyle: CSSVal;
  }) {
    return stackAt === "tablet" ? stackedStyle : desktopStyle;
  }

  function getMobileStyle({
    stackedStyle,
    desktopStyle,
  }: {
    stackedStyle: CSSVal;
    desktopStyle: CSSVal;
  }) {
    return stackAt === "never" ? desktopStyle : stackedStyle;
  }

  const [flexDir, setFlexDir] = useState(() =>
    props.stackColumnsAt === "never"
      ? "row"
      : props.reverseColumnsWhenStacked
      ? "column-reverse"
      : "column"
  );

  function columnsCssVars() {
    return {
      flexDirection: flexDir as "row" | "column" | "column-reverse",
    };
  }

  function columnCssVars(index: number) {
    const gutter = index === 0 ? 0 : gutterSize;
    const width = getColumnCssWidth(index);
    const gutterPixels = `${gutter}px`;
    const mobileWidth = "100%";
    const mobileMarginLeft = 0;
    const marginLeftKey = "margin-left";
    const sharedStyles = {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    };
    return {
      ...sharedStyles,
      marginLeft: props.stackColumnsAt === "never" ? gutter : 0,
    } as any as Dictionary<string>;
  }

  function getWidthForBreakpointSize(size: SizeName) {
    const breakpointSizes = getSizesForBreakpoints(
      props.builderContext.content?.meta?.breakpoints || {}
    );
    return breakpointSizes[size].max;
  }

  function columnsStyles() {
    return `
        @media (max-width: ${getWidthForBreakpointSize("medium")}px) {
          .${props.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir-tablet);
            align-items: stretch;
          }

          .${props.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-tablet) !important;
            margin-left: var(--column-margin-left-tablet) !important;
          }
        }

        @media (max-width: ${getWidthForBreakpointSize("small")}px) {
          .${props.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir);
            align-items: stretch;
          }

          .${props.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-mobile) !important;
            margin-left: var(--column-margin-left-mobile) !important;
          }
        },
      `;
  }

  function getAttributes(column: any, index: number) {
    return {
      ...{
        dataSet: {
          "builder-block-name": "builder-column",
        },
      },
      ...(column.link
        ? {
            href: column.link,
          }
        : {}),
      [getClassPropName()]: "builder-column",
      style: mapStyleObjToStrIfNeeded(columnCssVars(index)),
    };
  }

  return (
    <View
      style={{
        ...styles.view1,
        ...columnsCssVars(),
      }}
      {...{
        dataSet: {
          "builder-block-name": "builder-columns",
        },
      }}
    >
      {TARGET !== "reactNative" ? (
        <InlinedStyles id="builderio-columns" styles={columnsStyles()} />
      ) : null}
      {props.columns?.map((column, index) => (
        <DynamicRenderer
          key={index}
          TagName={getTagName(column)}
          actionAttributes={{}}
          attributes={getAttributes(column, index)}
        >
          <Blocks
            path={`component.options.columns.${index}.blocks`}
            parent={props.builderBlock.id}
            styleProp={{
              flexGrow: 1,
            }}
            context={props.builderContext}
            registeredComponents={props.builderComponents}
            linkComponent={props.builderLinkComponent}
            blocks={column.blocks}
          />
        </DynamicRenderer>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ view1: { display: "flex" } });

export default Columns;
