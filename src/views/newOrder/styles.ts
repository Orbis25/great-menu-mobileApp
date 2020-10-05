import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  totalLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  priceLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 80,
  },
  inputContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 100,
    marginBottom: 60,
  },
  btnAccept: {
    width: '100%',
    backgroundColor: theme.primary,
    borderWidth: 0,
    marginBottom: 10,
  },
  btnCancel: {
    width: '100%',
    backgroundColor: theme.dark,
    borderWidth: 0,
  },
  image: {
    width: 300,
    height: 300,
  },
  imageContainer: {},
});
