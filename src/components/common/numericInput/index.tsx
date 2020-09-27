import React from 'react';
import {Input, Icon, Button} from '@ui-kitten/components';
import {View} from 'react-native';
import {styles} from './styles';
import {theme} from '../../../utils/theme';

type Props = {
  counter: number;
  handler: (value: number) => void;
};
const NumericInput: React.FC<Props> = ({counter, handler}) => {
  const handlePressUp = () => {
    handler(counter + 1);
  };
  const handlePressDonw = () => {
    if (counter > 1) {
      handler(counter - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          size="small"
          onPress={handlePressDonw}
          accessoryRight={(props) => (
            <Icon {...props} fill={theme.white} name="minus" />
          )}></Button>
      </View>

      <View>
        <Input
          textStyle={{textAlign: 'center'}}
          style={styles.input}
          value={counter.toString()}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          size="small"
          onPress={handlePressUp}
          accessoryRight={(props) => (
            <Icon {...props} fill={theme.white} name="plus" />
          )}></Button>
      </View>
    </View>
  );
};

export default NumericInput;
