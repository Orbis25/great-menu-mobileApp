import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  head: {
    backgroundColor: theme.primary,
    height: 350,
    borderBottomLeftRadius: 40,
    marginBottom: 20,
    borderBottomRightRadius: 40,
  },
  pic: {
    marginTop: 10,
    height: 275,
    width: 275,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  textName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: theme.white,
  },
  infoContainer: {},
  priceContainer: {
    flexDirection: 'row',
    backgroundColor: theme.success,
    width: 130,
    padding: 5,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  textPrice: {
    color: theme.white,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: theme.accent,
    borderColor: theme.accent,
  },
});
