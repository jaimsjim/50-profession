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
import Blocks from "../../components/blocks/blocks";
import type { BuilderBlock } from "../../types/builder-block";
import type { TabsProps } from "./tabs.types";

function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = useState(() =>
    props.defaultActiveTab ? props.defaultActiveTab - 1 : 0
  );

  function activeTabContent(active: number) {
    return props.tabs && props.tabs[active].content;
  }

  function onClick(index: number) {
    if (index === activeTab && props.collapsible) {
      setActiveTab(-1);
    } else {
      setActiveTab(index);
    }
  }

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row" as "row" | "column" | "column-reverse",
          justifyContent: props.tabHeaderLayout || "flex-start",
          overflow: "scroll" as "scroll" | "visible" | "hidden",
        }}
      >
        {props.tabs?.map((tab, index) => (
          <Pressable
            key={index}
            style={{
              ...(activeTab === index ? props.activeTabStyle : {}),
            }}
            onPress={(event) => onClick(index)}
          >
            <Blocks
              parent={props.builderBlock.id}
              path={`component.options.tabs.${index}.label`}
              blocks={tab.label}
              context={props.builderContext}
              registeredComponents={props.builderComponents}
              linkComponent={props.builderLinkComponent}
            />
          </Pressable>
        ))}
      </View>
      {activeTabContent(activeTab) ? (
        <View>
          <Blocks
            parent={props.builderBlock.id}
            path={`component.options.tabs.${activeTab}.content`}
            blocks={activeTabContent(activeTab)}
            context={props.builderContext}
            registeredComponents={props.builderComponents}
            linkComponent={props.builderLinkComponent}
          />
        </View>
      ) : null}
    </View>
  );
}

export default Tabs;
