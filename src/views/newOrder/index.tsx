import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Text} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, TextInputChangeEventData} from 'react-native';
import {NativeSyntheticEvent} from 'react-native';
import {ScrollView, View} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Container from '../../components/common/container';
import {Order, OrderState} from '../../models/Order';
import {RootParamList} from '../../navigation';
import AuthService from '../../services/authService';
import OrderService from '../../services/orderService';
import FoodContext from '../../store/contexts/food/FoodContext';
import {theme} from '../../utils/theme';
import {styles} from './styles';

export type Props = StackScreenProps<RootParamList, 'FoodDetail'>;

const NewOrderScreen: React.FC<Props> = ({navigation}) => {
  //state
  const [table, setTable] = useState<string>('');
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  //context
  const context = useContext(FoodContext);

  useEffect(() => {
    setTotal(context.getTotal());
  }, []);

  const handleCancel = () => {
    setShowCancelAlert(true);
  };

  const handleConfirmFood = () => {
    setShowConfirm(true);
  };

  const handleChangeTable = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setTable(e.nativeEvent.text);
  };

  const CancelAlert = () => {
    const handleCloseModal = () => {
      setShowCancelAlert(false);
    };
    const handleCancel = () => {
      context.clear();
      handleCloseModal();
      navigation.navigate('Home');
    };

    return (
      <AwesomeAlert
        show={showCancelAlert}
        showProgress={false}
        title="¿Esta Seguro?"
        message="Si hace esto su pedido será eliminado."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        alertContainerStyle={{background: 'red'}}
        overlayStyle={{background: 'red'}}
        actionContainerStyle={{background: 'red'}}
        confirmButtonColor={theme.success}
        onCancelPressed={handleCloseModal}
        onConfirmPressed={handleCancel}
      />
    );
  };

  const ConfirmAlert = () => {
    const validTable = table.length;

    //state
    const [title, setTitle] = useState<string>(
      validTable ? '¿Esta Seguro?' : '',
    );
    const [showCancelButton, setShowCancelButton] = useState<boolean>(
      validTable ? true : false,
    );
    const [showAceptBtn, setShowAceptBtn] = useState<boolean>(true);
    const [message, setMessage] = useState<string>(
      validTable
        ? 'Si acepta no podrá cambiar su pedido'
        : 'Falta colocar el # de la mesa',
    );

    const handleCloseModal = () => {
      setShowConfirm(false);
    };

    const handleAcept = async () => {
      if (table.length) {
        //modificated the popup
        setShowCancelButton(false);
        setShowAceptBtn(false);
        setTitle('');
        setMessage('Espere un momento...');

        //get user
        const user = new AuthService().auth?.currentUser;

        //mapping model
        const model: Order = {
          orders: context.orders,
          tableNumber: Number(table),
          uidUser: user?.uid ?? '',
          orderState: OrderState.Pending,
          total: total,
          time: 0,
        };

        //send to db
        try {
          const response = await new OrderService().create(model);
          context.proccedOrder(response.id);
          setShowConfirm(false);
          navigation.navigate('OrderStatus');
        } catch (error) {
          setShowCancelButton(true);
          setShowAceptBtn(false);
          setTitle('Error');
          setMessage(error.message);
        }
      } else {
        setShowConfirm(false);
      }
    };

    return (
      <AwesomeAlert
        show={showConfirm}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={showCancelButton}
        showConfirmButton={showAceptBtn}
        cancelText="Cancelar"
        confirmText="Aceptar"
        alertContainerStyle={{background: 'red'}}
        overlayStyle={{background: 'red'}}
        actionContainerStyle={{background: 'red'}}
        confirmButtonColor={theme.success}
        onCancelPressed={handleCloseModal}
        onConfirmPressed={handleAcept}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CancelAlert />
      <ConfirmAlert />
      <Container>
        <ScrollView>
          <View>
            <Text style={styles.totalLabel} appearance="hint" category="h3">
              Total
            </Text>
            <Text style={styles.priceLabel} category="h3">
              ${total}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              textStyle={{textAlign: 'center'}}
              style={styles.input}
              size="large"
              label="Numero de mesa"
              keyboardType="numeric"
              value={table}
              onChange={handleChangeTable}
            />
            <Button
              onPress={handleConfirmFood}
              activeOpacity={0.5}
              style={styles.btnAccept}>
              Aceptar
            </Button>
            <Button
              onPress={handleCancel}
              activeOpacity={0.5}
              style={styles.btnCancel}>
              Cancelar
            </Button>
          </View>
        </ScrollView>
      </Container>
    </View>
  );
};

export default NewOrderScreen;
