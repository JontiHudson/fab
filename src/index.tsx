import React from "react";
import { View } from "react-native";

import { Children } from "./Children";
import { DEFAULT_SIZE } from "./constants";
import { FABState } from "./FABState";
import { Overlay } from "./Overlay";

import { Types } from "./types";

export function createFAB() {
  const State = new FABState();

  return class FAB extends React.Component<Types.Props> {
    static close = State.closeFAB;
    static closeAllFABs = State.closeAllFABs;
    static closeOtherFABs = State.closeOtherFABs;
    static DEFAULT_SIZE = DEFAULT_SIZE;
    static hide = State.hideFAB;
    static open = State.openFAB;
    static setActions = State.setFABActions;
    static show = State.showFAB;

    render() {
      return (
        <View style={{ flex: 1 }}>
          <Children {...this.props} State={State} />
          <Overlay {...this.props} State={State} />
        </View>
      );
    }
  };
}

export const FAB = createFAB();

export type { Types as FABTypes };
