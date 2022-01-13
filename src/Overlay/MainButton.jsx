"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainButton = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const animations_1 = require("@huds0n/animations");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const constants_1 = require("../constants");
function MainButton(props) {
    return (<components_1.Pressable onPress={handleOnPress(props)} style={{ zIndex: 100 }}>
      <animations_1.AnimatedView animate={getRotationalAnimation(props)} useNativeDriver>
        {<MainBadge {...props}/>}
        {getIconComponent(props)}
      </animations_1.AnimatedView>
    </components_1.Pressable>);
}
exports.MainButton = MainButton;
function getIconComponent({ positionBottom, FABIconColor = theme_1.theme.colors.BACKGROUND, FABIcon = getDefaultFABIcon(positionBottom), }) {
    return (<components_1.Icon color={FABIconColor} {...FABIcon} containerStyle={{}} badge={0} badgeProps={{}}/>);
}
function getDefaultFABIcon(positionBottom) {
    return {
        name: positionBottom ? "chevron-up" : "chevron-down",
        set: "MaterialCommunityIcons",
        size: constants_1.DEFAULT_SIZE,
    };
}
function MainBadge({ animationDuration = constants_1.DEFAULT_ANIMATION_DURATION, FABIconColor = theme_1.theme.colors.BACKGROUND, FABSize = constants_1.DEFAULT_SIZE, State, }) {
    const [{ actions, isOpen }] = State.useState(["actions", "isOpen"]);
    if (true) {
        const value = actions
            .filter((action) => !!action)
            .reduce((acc, current) => acc + (current.icon?.badge || 0), 0);
        return (<animations_1.AnimatedView animate={{
                to: { opacity: isOpen ? 0 : 1 },
                duration: animationDuration / 2,
                delay: isOpen ? 0 : animationDuration / 2,
            }} style={{
                position: "absolute",
                height: "100%",
                width: "100%",
            }} useNativeDriver>
        <components_1.Badge containerStyle={{ top: FABSize * 0.05, left: FABSize * 0.65 }} textColor={FABIconColor} size={FABSize * 0.3} value={value}/>
      </animations_1.AnimatedView>);
    }
}
function getRotationalAnimation({ animationDuration = constants_1.DEFAULT_ANIMATION_DURATION, positionBottom, positionRight, rotateOnOpen = true, State, }) {
    const [isOpen] = State.useProp("isOpen");
    const openClockwise = (positionBottom && !positionRight) || (!positionBottom && positionRight);
    return {
        onAnimationStart: () => {
            State.setState({ isAnimating: true });
        },
        onAnimationEnd: (attachedProps) => {
            attachedProps.length && State.setState({ isAnimating: false });
        },
        to: {
            transform: [
                {
                    rotate: !isOpen || !rotateOnOpen
                        ? "0deg"
                        : openClockwise
                            ? "180deg"
                            : "-180deg",
                },
            ],
        },
        duration: animationDuration,
    };
}
function handleOnPress({ State }) {
    const [{ onFABPress }] = State.useState("onFABPress");
    return (0, utilities_1.useCallback)(() => {
        State.toggleFAB();
        State.closeOtherFABs();
        onFABPress?.();
    }, [onFABPress]);
}
