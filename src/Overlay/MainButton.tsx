import React from 'react';

import { AnimatedView } from '@huds0n/animations';
import { Badge, Icon, Pressable } from '@huds0n/components';
import { theme } from '@huds0n/theming/src/theme';
import { useCallback } from '@huds0n/utilities';

import { DEFAULT_ANIMATION_DURATION, DEFAULT_SIZE } from '../constants';
import { FABState } from '../FABState';
import * as Types from '../types';

export function MainButton(props: Types.Props & { State: FABState }) {
  return (
    <Pressable onPress={handleOnPress(props)} style={{ zIndex: 100 }}>
      <AnimatedView animate={getRotationalAnimation(props)} useNativeDriver>
        {<MainBadge {...props} />}
        {getIconComponent(props)}
      </AnimatedView>
    </Pressable>
  );
}

function getIconComponent({
  positionBottom,
  FABIconColor = theme.colors.BACKGROUND,
  FABIcon = getDefaultFABIcon(positionBottom),
}: Types.Props) {
  return (
    <Icon
      color={FABIconColor}
      {...FABIcon}
      containerStyle={{}}
      badge={0}
      badgeProps={{}}
    />
  );
}

function getDefaultFABIcon(positionBottom: boolean | undefined) {
  return {
    name: positionBottom ? 'chevron-up' : 'chevron-down',
    set: 'MaterialCommunityIcons',
    size: DEFAULT_SIZE,
  } as const;
}

function MainBadge({
  animationDuration = DEFAULT_ANIMATION_DURATION,
  FABIconColor = theme.colors.BACKGROUND,
  FABSize = DEFAULT_SIZE,
  State,
}: Types.Props & { State: FABState }) {
  const [{ actions, isOpen }] = State.useState(['actions', 'isOpen']);

  if (true) {
    const value = actions
      .filter((action) => !!action)
      .reduce(
        (acc, current) => acc + ((current as Types.Action).icon?.badge || 0),
        0,
      );

    return (
      <AnimatedView
        animate={{
          to: { opacity: isOpen ? 0 : 1 },
          duration: animationDuration / 2,
          delay: isOpen ? 0 : animationDuration / 2,
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
        useNativeDriver
      >
        <Badge
          containerStyle={{ top: FABSize * 0.05, left: FABSize * 0.65 }}
          textColor={FABIconColor}
          size={FABSize * 0.3}
          value={value}
        />
      </AnimatedView>
    );
  }
}

function getRotationalAnimation({
  animationDuration = DEFAULT_ANIMATION_DURATION,
  positionBottom,
  positionRight,
  rotateOnOpen = true,
  State,
}: Types.Props & { State: FABState }) {
  const [isOpen] = State.useProp('isOpen');

  const openClockwise =
    (positionBottom && !positionRight) || (!positionBottom && positionRight);

  return {
    onAnimationStart: () => {
      State.setState({ isAnimating: true });
    },
    onAnimationEnd: (attachedProps: string[]) => {
      attachedProps.length && State.setState({ isAnimating: false });
    },

    to: {
      transform: [
        {
          rotate:
            !isOpen || !rotateOnOpen
              ? '0deg'
              : openClockwise
              ? '180deg'
              : '-180deg',
        },
      ],
    },
    duration: animationDuration,
  };
}

function handleOnPress({ State }: { State: FABState }) {
  const [{ onFABPress }] = State.useState('onFABPress');

  return useCallback(() => {
    State.toggleFAB();
    State.closeOtherFABs();
    onFABPress?.();
  }, [onFABPress]);
}
