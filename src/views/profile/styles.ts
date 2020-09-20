import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnSignOut: {
    marginBottom: 10,
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  btnGoBack: {
    marginBottom: 10,
  },
  input:{
    marginBottom:10
  }
});
