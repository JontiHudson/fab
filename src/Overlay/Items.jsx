"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const constants_1 = require("../constants");
const DEFAULT_ICON_MARGIN = 10;
const DEFAULT_ITEM_HEIGHT = constants_1.DEFAULT_SIZE - DEFAULT_ICON_MARGIN;
const DEFAULT_ITEM_ICON_SIZE = constants_1.DEFAULT_SIZE - 2 * DEFAULT_ICON_MARGIN;
const DEFAULT_ITEM_CONTAINER = {
    alignItems: "center",
    height: DEFAULT_ITEM_HEIGHT,
};
const DEFAULT_ITEM_ICON = {
    get color() {
        return theme_1.theme.colors.BACKGROUND;
    },
    size: DEFAULT_ITEM_ICON_SIZE * 0.75,
    containerStyle: {
        height: DEFAULT_ITEM_ICON_SIZE,
        width: DEFAULT_ITEM_ICON_SIZE,
    },
};
const DEFAULT_ITEM_TEXT_STYLE = {
    get color() {
        return theme_1.theme.colors.BACKGROUND;
    },
    fontSize: theme_1.theme.fontSizes.NOTE,
};
function Items({ animationDuration = constants_1.DEFAULT_ANIMATION_DURATION, baseAction, positionBottom, positionRight, State, }) {
    const [{ actions, isAnimating, isOpen }] = State.useState([
        "actions",
        "isOpen",
        "isAnimating",
    ]);
    const visibleActions = (0, utilities_1.useRef)([]);
    (0, utilities_1.useEffect)(() => {
        if (!isOpen && !isAnimating) {
            visibleActions.current = actions;
        }
    }, [actions, isAnimating, isOpen]);
    let offset = 0;
    const ActionItems = visibleActions.current
        .filter((action) => !!action)
        .map((action) => {
        const { containerStyle, textStyle, icon, onPress, title } = action;
        const _containerStyle = Object.assign(Object.assign(Object.assign({}, DEFAULT_ITEM_CONTAINER), baseAction === null || baseAction === void 0 ? void 0 : baseAction.containerStyle), containerStyle);
        const _textStyle = Object.assign(Object.assign(Object.assign({}, DEFAULT_ITEM_TEXT_STYLE), baseAction === null || baseAction === void 0 ? void 0 : baseAction.textStyle), textStyle);
        const _icon = (0, utilities_1.mergeObjects)((0, utilities_1.mergeObjects)(DEFAULT_ITEM_ICON, baseAction === null || baseAction === void 0 ? void 0 : baseAction.icon), icon);
        offset += _containerStyle.height;
        return (<animations_1.AnimatedView animate={{
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
            }} style={{
                opacity: 0,
                transform: [
                    {
                        translateY: positionBottom ? offset : -offset,
                    },
                ],
            }} pointerEvents={isOpen ? "auto" : "none"} key={title} useNativeDriver>
          <components_1.Pressable disabled={!onPress} feedback="fade" style={react_native_1.StyleSheet.flatten([
                { alignItems: "center" },
                positionBottom
                    ? { marginTop: theme_1.theme.spacings.M }
                    : { marginBottom: theme_1.theme.spacings.M },
                positionRight
                    ? { flexDirection: "row" }
                    : { flexDirection: "row-reverse" },
                _containerStyle,
            ])} onPress={() => {
                State.closeFAB();
                onPress === null || onPress === void 0 ? void 0 : onPress();
            }}>
            <react_native_1.View style={{ width: DEFAULT_ICON_MARGIN }}/>
            <react_native_1.Text style={_textStyle}>{title}</react_native_1.Text>

            {icon && (<>
                <react_native_1.View style={{ width: theme_1.theme.spacings.M }}/>
                <components_1.Icon {..._icon}/>
              </>)}

            <react_native_1.View style={{ width: DEFAULT_ICON_MARGIN }}/>
          </components_1.Pressable>
        </animations_1.AnimatedView>);
    });
    return <>{ActionItems}</>;
}
exports.Items = Items;
