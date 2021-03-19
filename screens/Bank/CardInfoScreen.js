import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import * as userActions from "../../store/actions/user";
import BankCard from "../../components/BankCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CardInfoScreen = (props) => {
  const time = new Date().getHours();
  var greetings = "";
  if (time > 5 && time < 11) {
    greetings = "Доброе утро";
  } else if (time > 11 && time < 15) {
    greetings = "Добрый день";
  } else if (time > 14 && time < 24) greetings = "Добрый Вечер";
  else if (time > 22 && time < 6) greetings = "Доброй ночи";
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.user.Name);
  const Cards = useSelector((state) => state.user.cards);
  const card = useSelector((state) => state.user.sc);
  // let s = async () => {

  //   try {
  //     await dispatch(userActions.GetUserInfo(userId));
  //     console.log('ok');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  useEffect(() => {
    const getI = async () => {
      await dispatch(userActions.GetUserInfo(userId));
      await dispatch(userActions.GetCards());
    };
    getI();
  }, [dispatch]);

  let a = () => {};

  const RenderIten = (itemData) => {
    return (
      <BankCard
        img={itemData.item.Image}
        style={styles.card}
        onRefresh={gc}
        id={itemData.item.id}
      />
    );
  };

  const gc = () => {
    props.navigation.navigate("OperationInfo");
  };

  if (Cards.length >= 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{greetings}</Text>
        <Text style={styles.Text}>Ваши карточки</Text>
        <View style={styles.container}>
          <FlatList renderItem={RenderIten} data={Cards} numColumns={1} />
        </View>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.greeting}>{greetings}</Text>
          <Text style={styles.Text}>Ваши карточки, а, ой упс, у Вас их нет...</Text>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
  },
  greeting: {
    fontSize: 17,
    marginVertical: 15,
  },
  Text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default CardInfoScreen;
