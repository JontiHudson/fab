import { Icon } from '@huds0n/components';

const action = {
  containerStyle: 'viewStyle',
  textStyle: 'textStyle',
  icon: Icon.theming.props,
} as const;

export const theming = {
  action,
  props: {
    baseAction: action,
    drawerColor: 'color',
    drawerWidth: 'dimension',
    FABColor: 'color',
    FABIcon: Icon.theming.props,
    FABIconColor: 'color',
    positionOffsetX: 'spacing',
    positionOffsetY: 'spacing',
  },
} as const;
