import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import * as authActions from '../../store/actions/auth';
import * as userActions from '../../store/actions/user';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const AuthScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {

            await dispatch(action);
            // props.navigation.navigate('BankNavigator');
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
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView


            style={styles.screen}
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        requiredemailautoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color='green' />
                        ) : (
                            <Button
                                title={isSignup ? 'Sign Up' : 'Login'}

                                onPress={authHandler}
                            />
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}

                            onPress={() => {
                                setIsSignup(prevState => !prevState);
                            }}
                        />
                    </View>
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 500,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default AuthScreen;
