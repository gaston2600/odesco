import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PublicTabNavigator from '../../../navigation/tabs/PublicTabNavigator';
import PublicHeaderCmp from './components/PublicHeaderCmp';

const PublicScreen = (props: any) => {
  const {navigation} = props;
  return (
    <View style={styles.containStyle}>
      <PublicHeaderCmp navigation={navigation} />
      <View style={styles.containStyle}>
        <PublicTabNavigator />
      </View>
    </View>
  );
};

export default PublicScreen;

const styles = StyleSheet.create({
  containStyle: {
    flex: 1,
  },
});
