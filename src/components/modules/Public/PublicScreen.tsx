import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PublicTabNavigator from '../../../navigation/tabs/PublicTabNavigator';
import PublicHeaderCmp from './components/PublicHeaderCmp';
import PublicHomeScreen from './Screens/PublicHomeScreen';
import PublicServicesScreen from './Screens/PublicServicesScreen';
import PublicInstScreen from './Screens/PublicInstScreen';

const PublicScreen = (props: any) => {
  const {navigation} = props;
  return (
    <View style={styles.containStyle}>
      <PublicHeaderCmp navigation={navigation} />
      <ScrollView style={styles.containStyle}>
        {/* <PublicTabNavigator /> */}
        <PublicHomeScreen navigation={navigation} />
        <PublicServicesScreen navigation={navigation} />
        <PublicInstScreen navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default PublicScreen;

const styles = StyleSheet.create({
  containStyle: {
    flex: 1,
  },
});
