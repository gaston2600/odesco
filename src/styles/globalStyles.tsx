import {StyleSheet} from 'react-native';
import fonts from '../theme/fonts';

export default StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
  },
});
