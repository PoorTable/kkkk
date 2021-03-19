import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import CardInfoScreen from '../screens/Bank/CardInfoScreen';
import OperationScreen from '../screens/Bank/OperationScreen';
import UserInfoScreen from '../screens/User/UserInfoScreen';
import AuthScreen from '../screens/User/AuthScreen';
import UserCabinetScreen from '../screens/User/UserCabinetScreen';
import CreateCardScren from '../screens/User/CreateCardScreen';

const BankStackNavigator = createStackNavigator();

export const BankNavigator = () => {
    return (
        <BankStackNavigator.Navigator>
            <BankStackNavigator.Screen
                name='CardInfo'
                component={CardInfoScreen}
            />
            <BankStackNavigator.Screen
                name='OperationInfo'
                component={OperationScreen}
            />

        </BankStackNavigator.Navigator>
    );
};

const UserStackNavigator = createStackNavigator();


export const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator>
            <UserStackNavigator.Screen
                name='UserCabinet'
                component={UserCabinetScreen}
            />
            <UserStackNavigator.Screen
                name='UserInfo'
                component={UserInfoScreen}
            />
            <UserStackNavigator.Screen
                name='CreateCard'
                component={CreateCardScren}
            />
        </UserStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name='Authentification'
                component={AuthScreen}
            />
        </AuthStackNavigator.Navigator>
    );
};

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Cards'
                component={BankNavigator}
            />
            <Tab.Screen
                name='User'
                component={UserNavigator}
            />
        </Tab.Navigator>
    );
};

