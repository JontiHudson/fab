"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAB = exports.createFAB = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const Children_1 = require("./Children");
const constants_1 = require("./constants");
const FABState_1 = require("./FABState");
const Overlay_1 = require("./Overlay");
function createFAB() {
    var _a;
    const State = new FABState_1.FABState();
    return _a = class FAB extends react_1.default.Component {
            render() {
                return (<react_native_1.View style={{ flex: 1 }}>
          <Children_1.Children {...this.props} State={State}/>
          <Overlay_1.Overlay {...this.props} State={State}/>
        </react_native_1.View>);
            }
        },
        _a.close = State.closeFAB,
        _a.closeAllFABs = State.closeAllFABs,
        _a.closeOtherFABs = State.closeOtherFABs,
        _a.DEFAULT_SIZE = constants_1.DEFAULT_SIZE,
        _a.hide = State.hideFAB,
        _a.open = State.openFAB,
        _a.setActions = State.setFABActions,
        _a.show = State.showFAB,
        _a;
}
exports.createFAB = createFAB;
exports.FAB = createFAB();
