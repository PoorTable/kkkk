import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import * as userActions from '../../store/actions/user';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input'
import User from '../../models/user'

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


const UserInfoScreen = props => {

    const userName = useSelector(state => state.user.Name);
    const Surname = useSelector(state => state.user.Surname);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            Name: userName,
            Surname: Surname
        },
        inputValidities: {
            Name: false,
            Surname: false
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
        let Name = formState.inputValues.Name;
        let SurName = formState.inputValues.Surname;

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(userActions.AddUserInfo(Name, SurName));
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    const UpdateHandler = async () => {
        let Name = formState.inputValues.Name;
        let SurName = formState.inputValues.Surname;

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(userActions.UpdateUserInfo(Name, SurName));
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

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

        <View style={styles.container}>

            <Input
                id="Name"
                label="Name"
                keyboardType="default"
                errorText="Please enter a valid Name."
                onInputChange={inputChangeHandler}
                initialValue={userName ? `${userName}` : ""}
                min={2}
            />

            <Input
                id="Surname"
                label="Surname"
                keyboardType="default"
                errorText="Please enter a valid Surname."
                onInputChange={inputChangeHandler}
                initialValue={Surname ? `${Surname}` : ""}
                min={4}
            />

            {isLoading ? (
                < ActivityIndicator size="small" color='green' />
            ) : (
                <Button
                    title={userName ? 'Update' : 'Save'}

                    onPress={userName ? UpdateHandler : authHandler}
                />
            )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserInfoScreen;