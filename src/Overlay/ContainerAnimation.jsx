"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerAnimation = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const constants_1 = require("../constants");
function ContainerAnimation({ animationDuration = constants_1.DEFAULT_ANIMATION_DURATION, positionBottom, positionRight, FABColor = theme_1.theme.colors.PRIMARY, FABSize = constants_1.DEFAULT_SIZE, drawerColor = theme_1.theme.colors.SECONDARY, State, }) {
    const [isOpen] = State.useProp("isOpen");
    const largerRadius = positionBottom
        ? positionRight
            ? "borderBottomLeftRadius"
            : "borderBottomRightRadius"
        : positionRight
            ? "borderTopLeftRadius"
            : "borderTopRightRadius";
    return (<components_1.LayoutView style={react_native_1.StyleSheet.absoluteFill}>
      {(layout) => (<animations_1.AnimatedView animate={[
                {
                    to: isOpen
                        ? { height: (layout === null || layout === void 0 ? void 0 : layout.height) || 0 }
                        : { height: FABSize },
                    duration: animationDuration * 0.75,
                    delay: isOpen ? animationDuration * 0.25 : 0,
                },
                {
                    to: isOpen ? { width: (layout === null || layout === void 0 ? void 0 : layout.width) || 0 } : { width: FABSize },
                    duration: animationDuration * 0.75,
                    delay: isOpen ? 0 : animationDuration * 0.25,
                },
                {
                    to: isOpen
                        ? {
                            [largerRadius]: FABSize,
                            backgroundColor: drawerColor ||
                                (0, utilities_1.addColorTransparency)(FABColor, 0.9) ||
                                FABColor,
                        }
                        : {
                            [largerRadius]: FABSize / 2,
                            backgroundColor: FABColor,
                        },
                    duration: animationDuration,
                },
            ]} style={react_native_1.StyleSheet.flatten([
                {
                    position: "absolute",
                    borderRadius: FABSize / 2,
                    [largerRadius]: FABSize / 2,
                    height: FABSize,
                    width: FABSize,
                    backgroundColor: FABColor,
                },
                positionRight ? { right: 0 } : { left: 0 },
                positionBottom ? { bottom: 0 } : { top: 0 },
            ])}/>)}
    </components_1.LayoutView>);
}
exports.ContainerAnimation = ContainerAnimation;
