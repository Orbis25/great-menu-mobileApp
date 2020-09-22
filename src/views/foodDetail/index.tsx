import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {styles} from './styles';
import {Image, View} from 'react-native';
import Container from '../../components/common/container';
import {ScrollView} from 'react-native-gesture-handler';
import {theme} from '../../utils/theme';

const FoodDetailScreen = () => {
  const _renderHead = () => {
    return (
      <Layout style={styles.head}>
        <Container>
          <Image
            style={styles.pic}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/great-menu-restaurant.appspot.com/o/images%2Ffoods%2F41599288421064491?alt=media&token=88785fdd-868b-478c-a298-416beba5abea',
            }}
            resizeMode="cover"
          />
          <Text style={styles.textName}>BIZCOCHO</Text>
        </Container>
      </Layout>
    );
  };

  const Info = () => {
    return (
      <Layout style={styles.infoContainer}>
        <Container>
          <Text category="p1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, ipsum
            ullam deleniti saepe animi modi adipisci qui sequi molestiae totam
            odio tenetur, tempora ut necessitatibus nemo nam optio dignissimos
            id.
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrice}>Precio:$1000</Text>
          </View>
          <Button appearance="ghost">Ordernar</Button>
        </Container>
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView>
        {_renderHead()}
        <Info />
      </ScrollView>
    </Layout>
  );
};

export default FoodDetailScreen;
