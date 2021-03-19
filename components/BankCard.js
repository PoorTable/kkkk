import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/actions/user';

import Colors from '../constants/Colors';

const BankCard = (props) => {
  const ctype = props.preview
    ? 'checkmark-outline'
    : 'refresh-outline';
  const btype = props.btype
    ? props.btype
    : 'Balance:';
  const image = {
    uri: props.img,
  };
  const a1 = {
    Name: props.btype,
    Type: props.Ktype,
    Image: props.img,
  };
  const id = props.id;
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const AddCardHolder = async () => {
    try {
      dispatch(
        await userActions.AddCard(
          a1.Name,
          a1.Type,
          a1.Image
        )
      );
    } catch (err) {
      Alert.alert('sss');
    }
  };
  if (!props.preview) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch1(userActions.SelectCard(id));
        }}
      >
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <ImageBackground
              source={image}
              style={styles.img}
              blurRadius={0.5}
            >
              <View style={styles.balance}>
                <Text style={styles.balanceText}>
                  {btype}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={props.onRefresh}
          >
            <View>
              <Ionicons
                name={ctype}
                size={32}
                color={Colors.accent}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ImageBackground
            source={image}
            style={styles.img}
            blurRadius={0.5}
            resizeMode='stretch'
          >
            <View style={styles.balance}>
              <Text style={styles.balanceText}>
                {btype}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
          onPress={AddCardHolder}
          style={styles.refreshButton}
        >
          <View>
            <Ionicons
              name={ctype}
              size={32}
              color={Colors.accent}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '90%',
    maxHeight: 155,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  card: {
    paddingVertical: 2,
    width: '83%',
    height: 153,
    paddingStart: 5,
  },
  img: {
    flex: 1,
    resizeMode: 'stretch',
  },
  refreshButton: {
    width: '20%',
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 19,
    color: Colors.primary,
  },
});

export default BankCard;
