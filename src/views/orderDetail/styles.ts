import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  btn: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    backgroundColor: theme.accent,
    borderWidth: 0,
  },
  btnMoreOrden: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: theme.primary,
    borderWidth: 0,
  },
  priceContainer: {
    width: 130,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },
  textPriceLable: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textPrice: {
    color: theme.dark,
    fontSize: 30,
  },
  listContainer: {
    height: 20,
    flex: 0.8,
  },
});
