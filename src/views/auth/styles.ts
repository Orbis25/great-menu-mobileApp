import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 700,
    marginBottom:30
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
  },
  titleTab: {
    color: theme.dark,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
