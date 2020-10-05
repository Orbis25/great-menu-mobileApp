import {StyleSheet} from 'react-native';
import {theme} from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    color: theme.white,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  orderTextContainer: {
    backgroundColor: theme.dark,
    height: 40,
    width: 100,
  },
  orderText: {
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
    color: theme.white,
  },
});
