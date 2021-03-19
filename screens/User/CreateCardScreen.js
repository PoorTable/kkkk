import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/user';


import Colors from '../../constants/Colors';
import BankCard from '../../components/BankCard';
import { CARDS } from '../../data/ddata';

const CreateCard = (props) => {
    const UserName = useSelector(
        (state) => state.user.Name
    );




    return (
        <ScrollView contentContainerStyle={styles.vc}>
            <View style={styles.plt}>

                <BankCard
                    img="https://psv4.userapi.com/c537232/u268798409/docs/d16/eaeb342b86ed/karta1.png?extra=c8XeFocmNJY9VRzeufhW5XxbOCaoB80GagEspGUY74vM6SWw3jvhNlgc7yGtv2vAkR7W9ZuxyIOpsm65Z1u5THYQOf2kF7rxIuqaZCv9VzaGsPANttlMhSDo7vZYRQabzf0j7K8NvrUIznU1rCUfhmqj"
                    preview='dsa'
                    btype='Название1'
                    Ktype='Накопительная'

                />
            </View>
            <View style={styles.plt}>
                <BankCard
                    img="https://psv4.userapi.com/c537232/u268798409/docs/d24/9322bcd9ec1f/karta3.png?extra=es0KOWMRwBQLLsf02eFlvzasS4FW0mQvVf0In0ezglRGMESnh4z88OR-eluUpfnD4VyUl83ZVq4lYDyfsBLY54hjDVWv45-MarMdh8w-pxHiGa4EaEeYTg6ZD9vKRtai6VUpwCifM6UTbm6jYo0capX3"
                    preview='dsa'
                    btype='Название2'
                    Ktype='Накопительная'

                />
            </View>
            <View style={styles.plt}>
                <BankCard
                    img="https://psv4.userapi.com/c536436/u268798409/docs/d9/b1093cf383f2/karta_5.png?extra=3wTXIVJyOFQRy5GqSQxvVMgQk9YO6LlV6zhYrsTy3ZALZtziA2K5glCo8OEPSLdVvNSWldtNA11juFvrokN-7nmgbKAzU6fFwSCAYsGkyhedwwwThlcBIT57rz6-gU5Sqnkp0jp6nmwbL_QRAmWwE2N1"
                    preview='dsa'
                    btype='Название3'
                    Ktype='Накопительная'

                />
            </View>
            <View style={styles.plt}>
                <BankCard
                    img="https://psv4.userapi.com/c536132/u268798409/docs/d4/a2df1b005e28/karta4.png?extra=a6zXTxZq7P2xJOYGDkf6KarXz4U8muBcQW34LKD3uGjTc8Z3c53QVKVaVwH5XaqqLV7cQ6K0LoiC6VKhQcgGkXZlWBJxEJHBsZXSNn2yC8Vj3z814kaS71F8VyJr8v2-e6ASDAbFbzfQfOTmkR-NELSz"
                    preview='dsa'
                    btype='Название4'
                    Ktype='Накопительная'
                />
            </View>
            <View style={styles.plt}>
                <BankCard
                    img="https://psv4.userapi.com/c536132/u268798409/docs/d47/066deb931245/karta2.png?extra=fCeZOzOekTzr1si7EN9Dp3xh7dh7X76KEQ53yg1vxXYRHD78w-bSvmimYwkiZOCoNnXejCnUkWB40Gm5KCulUCHEU_HuJstHewVcV99WXdrucmMOszNutPoppRox36-Rd_Th5FzQB-o8pjUaqosPAH8I"
                    preview='dsa'
                    btype='Название5'
                    Type='Накопительная'


                />
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    vc: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    plate: {
        width: '80%',
    },
    CustomText: {
        fontSize: 13,
        textAlign: 'center',
    },
    plt: {
        flex: 1,
        width: '95%',
        alignContent: 'center',
        alignItems: 'center',
    },

});

export default CreateCard;
