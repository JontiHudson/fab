"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const fab_1 = require("@huds0n/fab");
const FAB1 = (0, fab_1.createFAB)();
FAB1.setActions([
    { title: 'name', icon: { badge: 4, name: 'gears', set: 'FontAwesome' } },
    { title: 'test2', icon: { badge: 1, name: 'user', set: 'FontAwesome' } },
]);
const FAB2 = (0, fab_1.createFAB)();
FAB2.setActions([{ title: 'Version: 1.1.1' }]);
function Components() {
    return (<react_native_1.SafeAreaView style={styles.safeAreaView}>
      <FAB1 baseAction={{ textStyle: { color: colors.WHITE } }} drawerColor={colors.BLUE} FABColor={colors.GREEN} FABIconColor={colors.WHITE} positionRight>
        <FAB2 drawerColor={colors.GREY} positionBottom positionRight>
          <></>
        </FAB2>
      </FAB1>
    </react_native_1.SafeAreaView>);
}
exports.default = Components;
const colors = {
    BLUE: 'lightblue',
    GREEN: 'green',
    GREY: 'grey',
    WHITE: 'white',
};
const styles = react_native_1.StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
});
