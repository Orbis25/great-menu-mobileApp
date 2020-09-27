import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: theme.accent,
    borderWidth: 0,
  },
});
