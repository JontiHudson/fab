import React from 'react';
import { StyleSheet } from 'react-native';

import { AnimatedView } from '@huds0n/animations';
import { Core } from '@huds0n/core';
import { View } from '@huds0n/components';
import { addColorTransparency, multiplyDimension } from '@huds0n/utilities';

import { DEFAULT_ANIMATION_DURATION, DEFAULT_SIZE } from '../constants';
import { FABState } from '../FABState';
import * as Types from '../types';

export function ContainerAnimation({
  animationDuration = DEFAULT_ANIMATION_DURATION,
  positionBottom,
  positionRight,
  FABColor = Core.colors.PRIMARY,
  FABSize = DEFAULT_SIZE,
  drawerColor,
  State,
}: Types.Props & { State: FABState }) {
  const [isOpen] = State.useProp('isOpen');

  const largerRadius = positionBottom
    ? positionRight
      ? 'borderBottomLeftRadius'
      : 'borderBottomRightRadius'
    : positionRight
    ? 'borderTopLeftRadius'
    : 'borderTopRightRadius';

  return (
    <View style={StyleSheet.absoluteFill}>
      {(layout) => (
        <AnimatedView
          animate={[
            {
              to: isOpen
                ? { height: layout?.height || 0 }
                : { height: FABSize },
              duration: animationDuration * 0.75,
              delay: isOpen ? animationDuration * 0.25 : 0,
            },
            {
              to: isOpen ? { width: layout?.width || 0 } : { width: FABSize },
              duration: animationDuration * 0.75,
              delay: isOpen ? 0 : animationDuration * 0.25,
            },
            {
              to: isOpen
                ? {
                    [largerRadius]: FABSize,
                    backgroundColor:
                      drawerColor ||
                      addColorTransparency(FABColor, 0.9) ||
                      FABColor,
                  }
                : {
                    [largerRadius]: FABSize / 2,
                    backgroundColor: FABColor,
                  },
              duration: animationDuration,
            },
          ]}
          style={StyleSheet.flatten([
            {
              position: 'absolute',
              borderRadius: FABSize / 2,
              [largerRadius]: FABSize / 2,
              height: FABSize,
              width: FABSize,
              backgroundColor: FABColor,
            },
            positionRight ? { right: 0 } : { left: 0 },
            positionBottom ? { bottom: 0 } : { top: 0 },
          ])}
        />
      )}
    </View>
  );
}
