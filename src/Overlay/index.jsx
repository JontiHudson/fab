"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const constants_1 = require("../constants");
const ContainerAnimation_1 = require("./ContainerAnimation");
const Items_1 = require("./Items");
const MainButton_1 = require("./MainButton");
function Overlay(props) {
    (0, theming_1.useIsDarkMode)();
    const { positionBottom, positionRight, positionOffsetX = theme_1.theme.spacings.L, positionOffsetY = theme_1.theme.spacings.L, FABSize = constants_1.DEFAULT_SIZE, State, } = props;
    const [{ actions, isAnimating, isOpen, isHidden }] = State.useState([
        "isAnimating",
        "isHidden",
        "isOpen",
        "actions",
    ]);
    const show = !isHidden && !!actions.filter((action) => !!action).length;
    return (<animations_1.AnimatedView animate={show
            ? {
                to: { opacity: 1 },
                duration: 250,
            }
            : {
                to: { opacity: 0 },
                duration: 250,
            }} pointerEvents={show ? "box-none" : "none"} style={[react_native_1.StyleSheet.absoluteFill, { opacity: 0 }]} useNativeDriver>
      <react_native_1.View pointerEvents="box-none" style={react_native_1.StyleSheet.flatten([
            { position: "absolute" },
            positionBottom
                ? { bottom: positionOffsetY, flexDirection: "column-reverse" }
                : { top: positionOffsetY },
            positionRight
                ? { alignItems: "flex-end", right: positionOffsetX }
                : { alignItems: "flex-start", left: positionOffsetX },
            !isAnimating && !isOpen && { height: FABSize, width: FABSize },
        ])}>
        <ContainerAnimation_1.ContainerAnimation {...props}/>
        <MainButton_1.MainButton {...props}/>
        <Items_1.Items {...props}/>
      </react_native_1.View>
    </animations_1.AnimatedView>);
}
exports.Overlay = Overlay;
