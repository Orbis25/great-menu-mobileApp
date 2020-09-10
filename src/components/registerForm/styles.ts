import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
    marginBottom: 15,
  },
  spinnerContainer: {
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textResponse: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
