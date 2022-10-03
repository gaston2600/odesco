import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import I18n from 'react-native-i18n';
import fonts from '../../theme/fonts';
import MySpacesScreen from '../../components/modules/MySpaces/MySpacesScreen';
import ProfileScreen from '../../components/modules/MySpaces/ProfileScreen';
import TrainingScreen from '../../components/modules/Training/TrainingScreen';
import Icons from '../../styles/icons';

const MySpacesStack = (props: any) => {
  const {space, navigation} = props?.route?.params;

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MySpacesScreen">
      <Stack.Screen
        name="MySpacesScreen"
        children={(props: any) => <MySpacesScreen space={space} {...props} />}
        options={{
          headerTitle: '',
          // headerTitle: I18n.t('myPartners'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
          headerLeft: () => (
            <Pressable onPress={() => props?.navigation?.goBack()}>
              <Icons.AntDesign name="left" size={25} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        children={(props: any) => (
          <ProfileScreen space={space} {...props} navigation={navigation} />
        )}
        options={{
          headerTitle: I18n.t('profile'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
        }}
      />
      <Stack.Screen
        name="TrainingScreen"
        children={(props: any) => (
          <TrainingScreen space={space} {...props} navigation={navigation} />
        )}
        options={{
          headerTitle: I18n.t('trainings'),
          headerTitleStyle: {
            fontFamily: fonts.type.NunitoSemiBold,
            fontSize: fonts.size.font16,
          },
        }}
      />
      {/* <Stack.Screen name="CommentsScreen" component={CommentsScreen}
                options={{
                    headerTitle: I18n.t("comments"),
                    headerTitleStyle: {
                        fontFamily: fonts.type.NunitoSemiBold,
                        fontSize: fonts.size.font16
                    }
                }}
            /> */}
    </Stack.Navigator>
  );
};

export default MySpacesStack;

const styles = StyleSheet.create({});
