import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  TextInput,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import * as userActions from "../../store/actions/user";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const OperationScreen = (props) => {
  const sc = useSelector((state) => state.user.sc);
  const userName = useSelector((state) => state.user.Name);
  const Surname = useSelector((state) => state.user.Surname);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      Name: userName,
      Surname: Surname,
    },
    inputValidities: {
      Name: false,
      Surname: false,
    },
    formIsValid: false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const OperHandler = async () => {
    console.log(sc);
    let email = formState.inputValues.email;
    let sum = formState.inputValues.Ammount;

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(userActions.MakeTran(email, sum));
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView contentContainerStyle={styles.vc}>
      <Input
        id='email'
        label='E-Mail'
        keyboardType='email-address'
        requiredemailautoCapitalize='none'
        errorText='Please enter a valid email address.'
        onInputChange={inputChangeHandler}
        initialValue=''
      />
      <Input
        id='Ammount'
        label='Ammount'
        keyboardType='numeric'
        errorText='Please enter a valid ammount.'
        onInputChange={inputChangeHandler}
        initialValue=''
      />
      <View style={styles.MakeTran}>
        <TouchableOpacity onPress={OperHandler}>
          <Text>Совершить перевод</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  CustomText: {
    fontSize: 14,
  },
  MakeTran: {
    width: "80%",
    height: 50,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 10,
  },
});

export default OperationScreen;
