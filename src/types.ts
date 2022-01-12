import { TextStyle, ViewStyle } from "react-native";

import { ComponentTypes } from "@huds0n/components";

export declare namespace Types {
  export type Action = {
    closeOnPress?: boolean;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: ComponentTypes.IconProps;
    onPress?: () => void;
    title: string;
  };

  export type State = {
    actions: (Action | false)[];
    isAnimating: boolean;
    isOpen: boolean;
    isHidden: boolean;
    onFABPress: null | (() => void);
  };

  export type Props = {
    animationDuration?: number;
    baseAction?: Partial<Action>;
    children: React.ReactNode | React.ReactNode[];
    drawerColor?: string;
    drawerWidth?: number | string;
    FABColor?: string;
    FABSize?: number;
    FABIcon?: ComponentTypes.IconProps;
    FABIconColor?: string;
    onClose?: null | (() => void);
    onFABPress?: null | (() => void);
    onOpen?: null | (() => void);
    positionBottom?: boolean;
    positionOffsetX?: number | string;
    positionOffsetY?: number | string;
    positionRight?: boolean;
    rotateOnOpen?: boolean;
  };
}
