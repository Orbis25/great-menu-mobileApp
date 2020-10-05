import React, {useContext} from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {View, TouchableOpacity} from 'react-native';

import {
  Avatar,
  Button,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {styles} from './styles';
import {AuthContext} from '../../../store/contexts/auth/AuthContext';
import {getMyAvatar} from '../../../utils/Avatars';
import {RootParamList} from '../../../navigation';
import {theme} from '../../../utils/theme';
import FoodContext from '../../../store/contexts/food/FoodContext';

export const Header: React.FC<StackHeaderProps> = ({scene, previous}) => {
  //context
  const {user} = useContext(AuthContext);
  const {orderId} = useContext(FoodContext);

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const renderAvatar = () => {
    const goProfile = () => {
      navigation.navigate('Profile');
    };

    const goToOrder = () => {
      navigation.navigate('OrderStatus');
    };

    return (
      <View style={styles.rightContainer}>
        {!!orderId && (
          <TouchableOpacity onPress={goToOrder}>
            <View style={styles.orderTextContainer}>
              <Text style={styles.orderText}>Mi orden</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={goProfile}>
          <Avatar
            style={styles.logo}
            source={{uri: getMyAvatar(user?.email ?? '')}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{scene.descriptor.options.title}</Text>
    </View>
  );

  const BackIcon = (props: any) => (
    <Icon {...props} fill={theme.white} name="arrow-back" />
  );

  const BackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );

  return (
    <TopNavigation
      style={styles.container}
      title={renderTitle}
      accessoryRight={renderAvatar}
      accessoryLeft={previous?.descriptor ? BackAction : undefined}
    />
  );
};

export default Header;
