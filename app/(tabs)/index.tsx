import { Image, StyleSheet, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Content,
  fetchOneEntry,
  isPreviewing,
  BuilderContent,
} from "@/components/sdk-src";
import { useState, useEffect } from "react";

const BUILDER_API_KEY = "f1a790f8c3204b3b8c5c1795aeac4660"; // ggignore

export default function HomeScreen() {
  const [content, setContent] = useState<BuilderContent | undefined>(undefined);

  useEffect(() => {
    fetchOneEntry({
      model: "page",
      apiKey: BUILDER_API_KEY,
      userAttributes: {
        urlPath: "/",
      },
    })
      .then((content) => {
        if (content) {
          setContent(content);
        }
      })
      .catch((err) => {
        console.error(
          "something went wrong while fetching Builder Content: ",
          err
        );
      });
  }, []);

  const shouldRenderBuilderContent = content || isPreviewing();

  return (
    <ThemedView>
      {shouldRenderBuilderContent ? (
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Content apiKey={BUILDER_API_KEY} model="page" content={content} />
        </ThemedView>
      ) : (
        <ThemedText>Not Found.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
