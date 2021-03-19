import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';

const UserCabinet = (props) => {
  const GotoUIS = () => {
    props.navigation.navigate('UserInfo');
  };
  const GotoCCS = () => {
    props.navigation.navigate('CreateCard');
  };
  const UserName = useSelector(
    (state) => state.user.Name
  );
  let changeText = UserName
    ? 'Изменить личную информацию'
    : 'Добавить личную информацию';

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android') {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <ScrollView contentContainerStyle={styles.vc}>
      <TouchableCmp
        onPress={GotoUIS}
        style={styles.plate}
      >
        <View style={styles.plt}>
          <Text style={styles.CustomText}>
            {changeText}
          </Text>
        </View>
      </TouchableCmp>

      <TouchableCmp
        onPress={GotoCCS}
        style={styles.plate}
      >
        <View style={styles.plt}>
          <Text style={styles.CustomText}>
            Добавить карты
          </Text>
        </View>
      </TouchableCmp>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vc: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  CustomText: {
    fontSize: 14,
  },
  plt: {
    width: '80%',
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 10,
  },
});

export default UserCabinet;
