import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '@huds0n/components';

import { FABState } from './FABState';
import * as Types from './types';

export function Children({
  children,
  State,
}: Types.Props & { State: FABState }) {
  return (
    <View onPressThrough={State.closeFAB} style={StyleSheet.absoluteFill}>
      {children}
    </View>
  );
}
