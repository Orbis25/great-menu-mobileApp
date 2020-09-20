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
});
