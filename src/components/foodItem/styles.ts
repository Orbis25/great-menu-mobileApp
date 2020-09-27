import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
  },
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    width: '70%',
    marginLeft: 10,
  },
  foodTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  descriptionText: {
    fontSize: 12,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    backgroundColor: theme.success,
    width: 130,
    padding: 5,
    justifyContent: 'center',
    borderRadius: 20,
  },
  textPrice: {
    color: theme.white,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textRemove: {
    textAlign: 'right',
    fontWeight: 'bold',
    borderColor: 'red',
    color: theme.primary,
  },
});
