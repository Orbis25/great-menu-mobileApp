import React, {useContext} from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {View, TouchableOpacity} from 'react-native';

import {Avatar, Text, TopNavigation} from '@ui-kitten/components';

import {styles} from './styles';
import {AuthContext} from '../../../store/contexts/auth/AuthContext';
import {getMyAvatar} from '../../../utils/Avatars';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootParamList} from '../../../navigation';

export const Header: React.FC<StackHeaderProps> = ({scene}) => {
  //props
  const {descriptor} = scene;
  const {options} = descriptor;

  //context
  const {user} = useContext(AuthContext);

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const renderAvatar = () => {
    const goProfile = () => {
      navigation.navigate('Profile');
    };

    return (
      <TouchableOpacity onPress={goProfile}>
        <Avatar
          style={styles.logo}
          source={{uri: getMyAvatar(user?.email ?? '')}}
        />
      </TouchableOpacity>
    );
  };

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{options.title}</Text>
    </View>
  );

  return (
    <TopNavigation
      style={styles.container}
      title={renderTitle}
      accessoryRight={renderAvatar}
    />
  );
};

export default Header;
