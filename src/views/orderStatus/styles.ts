import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  spinner: {
    marginBottom: 20,
    height: 50,
  },
  textMessage: {
    textAlign: 'center',
  },
  imageContainer: {marginBottom: 50, marginTop: 50},
  btnContainer: {marginTop: 20},
  btn: {
    backgroundColor: theme.dark,
    borderWidth: 0,
  },
});
