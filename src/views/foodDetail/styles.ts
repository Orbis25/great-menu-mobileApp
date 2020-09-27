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
  infoContainer: {
    flex: 1,
  },
  priceContainer: {
    width: 130,
    justifyContent: 'center',
    borderRadius: 20,
  },
  textPriceLable: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textQuantityLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textPrice: {
    color: theme.dark,
    fontSize: 30,
  },
  btn: {
    backgroundColor: theme.accent,
    borderColor: theme.accent,
  },
  spinnerContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  getButton: {
    backgroundColor: theme.dark,
    borderRadius: 100,
    height: 50,
    width: 50,
    borderColor: theme.dark,
  },
  textBtn: {
    fontWeight: 'bold',
    color: theme.white,
  },
  btnContainerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
  },
});
