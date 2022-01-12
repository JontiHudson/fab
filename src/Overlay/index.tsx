import React from "react";
import { StyleSheet, View } from "react-native";

import { AnimatedView } from "@huds0n/animations";
import { useIsDarkMode } from "@huds0n/theming";
import { theme } from "@huds0n/theming/src/theme";

import { DEFAULT_SIZE } from "../constants";
import { FABState } from "../FABState";
import type { Types } from "../types";

import { ContainerAnimation } from "./ContainerAnimation";
import { Items } from "./Items";
import { MainButton } from "./MainButton";

export function Overlay(props: Types.Props & { State: FABState }) {
  useIsDarkMode();

  const {
    positionBottom,
    positionRight,
    positionOffsetX = theme.spacings.L,
    positionOffsetY = theme.spacings.L,
    FABSize = DEFAULT_SIZE,
    State,
  } = props;

  const [{ actions, isAnimating, isOpen, isHidden }] = State.useState([
    "isAnimating",
    "isHidden",
    "isOpen",
    "actions",
  ]);

  const show = !isHidden && !!actions.filter((action) => !!action).length;

  return (
    <AnimatedView
      animate={
        show
          ? {
              to: { opacity: 1 },
              duration: 250,
            }
          : {
              to: { opacity: 0 },
              duration: 250,
            }
      }
      pointerEvents={show ? "box-none" : "none"}
      style={[StyleSheet.absoluteFill, { opacity: 0 }]}
      useNativeDriver
    >
      <View
        pointerEvents="box-none"
        style={StyleSheet.flatten([
          { position: "absolute" },
          positionBottom
            ? { bottom: positionOffsetY, flexDirection: "column-reverse" }
            : { top: positionOffsetY },
          positionRight
            ? { alignItems: "flex-end", right: positionOffsetX }
            : { alignItems: "flex-start", left: positionOffsetX },
          !isAnimating && !isOpen && { height: FABSize, width: FABSize },
        ])}
      >
        <ContainerAnimation {...props} />
        <MainButton {...props} />
        <Items {...props} />
      </View>
    </AnimatedView>
  );
}
