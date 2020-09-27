import {StyleSheet} from 'react-native';
import {theme} from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  input: {
    height: 25,
    borderRadius: 0,
    borderWidth: 0,
    width: 60,
    alignContent: 'center',
  },
  btn: {
    height: 40,
    width: 40,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: theme.dark,
  },
  btnContainer: {},
});
