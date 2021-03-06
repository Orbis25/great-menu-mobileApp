import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  textError: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  spinnerContainer: {
    alignItems: 'center',
  },
});
