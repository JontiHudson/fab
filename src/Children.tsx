import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useCallback } from '@huds0n/utilities';

import { FABState } from './FABState';
import * as Types from './types';

export function Children({
  children,
  State,
}: Types.Props & { State: FABState }) {
  const handlePressThrough = useCallback(() => {
    State.closeFAB();
    return false;
  });

  return (
    <View
      onStartShouldSetResponderCapture={handlePressThrough}
      style={StyleSheet.absoluteFill}
    >
      {children}
    </View>
  );
}
