"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Children = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
function Children({ children, State, }) {
    const handlePressThrough = (0, utilities_1.useCallback)(() => {
        State.closeFAB();
        return false;
    });
    return (<react_native_1.View onStartShouldSetResponderCapture={handlePressThrough} style={react_native_1.StyleSheet.absoluteFill}>
      {children}
    </react_native_1.View>);
}
exports.Children = Children;
