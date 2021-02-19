import React from 'react';
import { StyleSheet } from 'react-native';

import { AnimationSheet, AnimatedView } from '@huds0n/animations';
import { View } from '@huds0n/components';
import { Core } from '@huds0n/core';

import { DEFAULT_SIZE } from '../constants';
import { FABState } from '../FABState';
import * as Types from '../types';

import { ContainerAnimation } from './ContainerAnimation';
import { Items } from './Items';
import { MainButton } from './MainButton';

export function Overlay(props: Types.Props & { State: FABState }) {
  const {
    positionBottom,
    positionRight,
    positionOffsetX = Core.spacings.L,
    positionOffsetY = Core.spacings.L,
    FABSize = DEFAULT_SIZE,
    State,
  } = props;

  const [{ actions, isAnimating, isOpen, isHidden }] = State.useState([
    'isAnimating',
    'isHidden',
    'isOpen',
    'actions',
  ]);

  const show = !isHidden && !!actions.filter((action) => !!action).length;

  return (
    <AnimatedView
      animate={show ? animations.fadeIn : animations.fadeOut}
      pointerEvents={show ? 'box-none' : 'none'}
      style={[StyleSheet.absoluteFill, { opacity: 0 }]}
      useNativeDriver
    >
      <View
        pointerEvents="box-none"
        style={StyleSheet.flatten([
          { position: 'absolute' },
          positionBottom
            ? { bottom: positionOffsetY, flexDirection: 'column-reverse' }
            : { top: positionOffsetY },
          positionRight
            ? { alignItems: 'flex-end', right: positionOffsetX }
            : { alignItems: 'flex-start', left: positionOffsetX },
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

const animations = AnimationSheet.create({
  fadeIn: {
    to: { opacity: 1 },
    duration: 250,
  },
  fadeOut: {
    to: { opacity: 0 },
    duration: 250,
  },
});
