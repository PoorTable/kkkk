export const ADD_USER_INFO = "ADD_USER_INFO";
export const GET_USER_INFO = "GET_USER_INFO";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const ADD_CARD = "ADD_CARD";
export const GET_CARDS = "GET_CARDS";
export const SELECT_CARD = "SELECT_CARD";
export const MAKE_TRAN = "MAKE_TRAN";

import BCard from "../../models/BCard";

export const MakeTran = (email, sum) => {
  return async (dispatch, getState) => {
    const sc = getState().user.sc;
    const token = getState().auth.token;
    console.log(sc);
    const UID = getState().auth.userId;
    const Balance = sc.Balance - sum;
    const response = await fetch(
      `https://rn-bdc-default-rtdb.firebaseio.com/cards/${UID}/${sc.id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Balance,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var nm;
    var snm;
    var uid;
    const resData = await response.json();

    console.log(resData);
    dispatch({
      type: MAKE_TRAN,
      Balance: resData.Balance,
    });
  };
};

export const SelectCard = (cardId) => {
  return {
    type: SELECT_CARD,
    cardId: cardId,
  };
};

export const GetCards = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-bdc-default-rtdb.firebaseio.com/cards/${userId}.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    var nm;
    var snm;
    var arr = [];
    const resData = await response.json();

    for (const key in resData) {
      console.log(key);
      arr.push(
        new BCard(
          key,
          resData[key].Name,
          resData[key].Type,
          resData[key].Image,
          resData[key].Balance
        )
      );
    }

    // console.log(token);

    dispatch({
      type: GET_CARDS,
      arr,
    });
  };
};

export const AddCard = (Name, Type, Image) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-bdc-default-rtdb.firebaseio.com/cards/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Type,
          Image,
          Balance: 1000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData.name);
    dispatch({
      type: ADD_CARD,
      id: resData.name,
      Name: Name,
      Type: Type,
      Image: Image,
      Balance: 1000,
    });
  };
};

export const AddUserInfo = (Name, Surname) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-bdc-default-rtdb.firebaseio.com/users.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          Name,
          Surname,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData.name);
    dispatch({
      type: ADD_USER_INFO,
      userId: resData.name,
      Name: Name,
      Surname: Surname,
    });
  };
};

export const GetUserInfo = (userId) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(`https://rn-bdc-default-rtdb.firebaseio.com/users.json`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    var nm;
    var snm;
    var uid;
    const resData = await response.json();

    for (const key in resData) {
      console.log(key);
      if (resData[key].userId === userId) {
        nm = resData[key].Name;
        snm = resData[key].Surname;
        uid = key;
      }
    }

    // console.log(token);

    dispatch({
      type: GET_USER_INFO,
      userId: uid,
      Name: nm,
      Surname: snm,
    });
  };
};

export const UpdateUserInfo = (Name, Surname) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const token = getState().auth.token;
    const UID = getState().auth.userId;
    const response = await fetch(
      `https://rn-bdc-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Surname,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var nm;
    var snm;
    var uid;
    const resData = await response.json();

    for (const key in resData) {
      uid = key;
      nm = resData[key].Name;
      snm = resData[key].Surname;
    }
    dispatch({
      type: UPDATE_USER_INFO,
      userId: uid,
      Name: nm,
      Surname: snm,
    });
  };
};
