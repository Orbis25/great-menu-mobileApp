import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';

type Props = {
  ml?: number;
  mr?: number;
  style?: object;
};

const Container: React.FC<Props> = ({children, ml = 10, mr = 10, style}) => {
  return (
    <View
      style={{
        ...style,
        ...styles.container,
        marginLeft: ml,
        marginRight: mr,
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
