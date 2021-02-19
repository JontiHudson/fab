import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AnimatedView } from '@huds0n/animations';
import { Core } from '@huds0n/core';
import { Icon, Pressable } from '@huds0n/components';
import { mergeObjects, useEffect, useRef } from '@huds0n/utilities';

import { DEFAULT_ANIMATION_DURATION, DEFAULT_SIZE } from '../constants';
import { FABState } from '../FABState';
import * as Types from '../types';

const DEFAULT_ICON_MARGIN = 10;
const DEFAULT_ITEM_HEIGHT = DEFAULT_SIZE - DEFAULT_ICON_MARGIN;
const DEFAULT_ITEM_ICON_SIZE = DEFAULT_SIZE - 2 * DEFAULT_ICON_MARGIN;

const DEFAULT_ITEM_CONTAINER = {
  alignItems: 'center',
  height: DEFAULT_ITEM_HEIGHT,
} as const;
const DEFAULT_ITEM_ICON = {
  color: Core.colors.WHITE,
  size: DEFAULT_ITEM_ICON_SIZE * 0.75,
  containerStyle: {
    height: DEFAULT_ITEM_ICON_SIZE,
    width: DEFAULT_ITEM_ICON_SIZE,
  },
} as const;
const DEFAULT_ITEM_TEXT_STYLE = {
  color: Core.colors.WHITE,
  fontSize: Core.fontSizes.NOTE,
} as const;

export function Items({
  animationDuration = DEFAULT_ANIMATION_DURATION,
  baseAction,
  positionBottom,
  positionRight,
  State,
}: Types.Props & { State: FABState }) {
  const [{ actions, isAnimating, isOpen }] = State.useState([
    'actions',
    'isOpen',
    'isAnimating',
  ]);

  const visibleActions = useRef<(Types.Action | false)[]>([]);

  useEffect(() => {
    if (!isOpen && !isAnimating) {
      visibleActions.current = actions;
    }
  }, [actions, isAnimating, isOpen]);

  let offset = 0;

  const ActionItems = visibleActions.current
    .filter((action) => !!action)
    .map((action) => {
      const {
        containerStyle,
        textStyle,
        icon,
        onPress,
        title,
      } = action as Types.Action;
      const _containerStyle = {
        ...DEFAULT_ITEM_CONTAINER,
        ...baseAction?.containerStyle,
        ...containerStyle,
      };

      const _textStyle = {
        ...DEFAULT_ITEM_TEXT_STYLE,
        ...baseAction?.textStyle,
        ...textStyle,
      };

      const _icon = mergeObjects(
        mergeObjects(DEFAULT_ITEM_ICON, baseAction?.icon),
        icon,
      );

      offset += _containerStyle.height as number;

      return (
        <AnimatedView
          animate={{
            to: {
              opacity: isOpen ? 1 : 0,
              transform: [
                {
                  translateY: isOpen ? 0 : positionBottom ? offset : -offset,
                },
              ],
            },
            duration: animationDuration * 0.75,
            delay: isOpen ? animationDuration * 0.25 : 0,
          }}
          style={{
            opacity: 0,
            transform: [
              {
                translateY: positionBottom ? offset : -offset,
              },
            ],
          }}
          pointerEvents={isOpen ? 'auto' : 'none'}
          key={title}
          useNativeDriver
        >
          <Pressable
            disabled={!onPress}
            feedback="fade"
            style={StyleSheet.flatten([
              { alignItems: 'center' },
              positionBottom
                ? { marginTop: Core.spacings.M }
                : { marginBottom: Core.spacings.M },
              positionRight
                ? { flexDirection: 'row' }
                : { flexDirection: 'row-reverse' },
              _containerStyle,
            ])}
            onPress={() => {
              State.closeFAB();
              onPress?.();
            }}
          >
            <View style={{ width: DEFAULT_ICON_MARGIN }} />

            <Text style={_textStyle}>{title}</Text>

            {icon && (
              <>
                <View style={{ width: Core.spacings.M }} />

                <Icon {..._icon} />
              </>
            )}

            <View style={{ width: DEFAULT_ICON_MARGIN }} />
          </Pressable>
        </AnimatedView>
      );
    });

  return <>{ActionItems}</>;
}
