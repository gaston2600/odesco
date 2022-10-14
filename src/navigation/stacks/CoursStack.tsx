import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import I18n from 'react-native-i18n';
import fonts from '../../theme/fonts';
import CoursScreen from '../../components/modules/Cours/CoursScreen';
import CoursDetailsScreen from '../../components/modules/Cours/CoursDetailsScreen';
const CoursStack = (props: any) => {
  // console.log({props});
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="CoursScreen ">
      <Stack.Screen
        name="CoursScreen"
        children={(props: any) => <CoursScreen {...props} />}
        options={{
          headerShown: false,
          headerTitle: I18n.t('cours'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
        }}
      />
      <Stack.Screen
        name="CoursDetailsScreen"
        children={(props: any) => <CoursDetailsScreen {...props} />}
        options={{
          headerShown: false,
          headerTitle: I18n.t('cours'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CoursStack;

const styles = StyleSheet.create({});
