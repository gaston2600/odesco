import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import LoginScreen from './src/components/modules/Auth/LoginScreen'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native'
import I18n from './src/translation/I18n';
import fonts from './src/theme/fonts'
import AppNavigation from './src/navigation/AppNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigation />
        {/* <View style={styles.containerStyle}>
          <Text style={{
            fontFamily :fonts.type.NunitoBold,
            fontSize : fonts.size.font12
          }}>{I18n.t('greeting')}</Text>
          <LoginScreen />
        </View> */}
      </Provider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})