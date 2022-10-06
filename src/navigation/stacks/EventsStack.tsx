import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import I18n from 'react-native-i18n';
import fonts from '../../theme/fonts';
import EventsScreen from '../../components/modules/Events/EventsScreen';
const EventsStack = (props: any) => {
  // console.log({props});
  const space = props?.route?.params?.space;

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="EventsSceen ">
      <Stack.Screen
        name="EventsSceen"
        // component={EventsScreen}
        children={(props: any) => <EventsScreen {...props} space={space} />}
        options={{
          headerShown: false,
          headerTitle: I18n.t('events'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default EventsStack;

const styles = StyleSheet.create({});
