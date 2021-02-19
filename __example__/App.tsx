import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { createFAB } from '@huds0n/fab';

const FAB1 = createFAB();
FAB1.setActions([
  { title: 'name', icon: { badge: 4, name: 'gears', set: 'FontAwesome' } },
  { title: 'test2', icon: { badge: 1, name: 'user', set: 'FontAwesome' } },
]);

const FAB2 = createFAB();
FAB2.setActions([{ title: 'Version: 1.1.1' }]);

export default function Components() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FAB1
        baseAction={{ textStyle: { color: colors.WHITE } }}
        drawerColor={colors.BLUE}
        FABColor={colors.GREEN}
        FABIconColor={colors.WHITE}
        positionRight
      >
        <FAB2 drawerColor={colors.GREY} positionBottom positionRight>
          <></>
        </FAB2>
      </FAB1>
    </SafeAreaView>
  );
}

const colors = {
  BLUE: 'lightblue',
  GREEN: 'green',
  GREY: 'grey',
  WHITE: 'white',
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
