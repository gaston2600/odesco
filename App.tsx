import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import LoginScreen from './src/components/modules/Auth/LoginScreen';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import I18n from './src/translation/I18n';
import fonts from './src/theme/fonts';
import AppNavigation from './src/navigation/AppNavigation';
import moment from 'moment';
import {MenuProvider} from 'react-native-popup-menu';
import NotificationContext from './src/Context/NotificationContext';

const App = () => {
  moment.locale('fr', {
    months:
      'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
        '_',
      ),
    monthsShort:
      'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
        '_',
      ),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans',
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number) {
      return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
      return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // Used to determine first week of the year.
    },
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <NotificationContext>
          <MenuProvider backHandler={true}>
            <AppNavigation />
            {/* <View style={styles.containerStyle}>
          <Text style={{
            fontFamily :fonts.type.NunitoBold,
            fontSize : fonts.size.font12
          }}>{I18n.t('greeting')}</Text>
          <LoginScreen />
        </View> */}
          </MenuProvider>
        </NotificationContext>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
