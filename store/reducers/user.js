import BCard from "../../models/BCard";

import {
  GET_USER_INFO,
  ADD_USER_INFO,
  UPDATE_USER_INFO,
  ADD_CARD,
  GET_CARDS,
  SELECT_CARD,
  MAKE_TRAN,
} from "../actions/user";

const initialState = {
  userId: null,
  Name: null,
  Surname: null,
  cards: [],
  sc: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_TRAN:
      const bal = action.Balance;
      const s = state.sc;
      s.Balance = bal;
      return {
        ...state,
        sc: s,
      };
    case SELECT_CARD:
      const card = state.cards.find((c) => (c.id = action.cardId));
      return {
        ...state,
        sc: card,
      };
    case ADD_USER_INFO:
      const authUserId = action.userId;
      const Name = action.Name;
      const SN = action.Surname;
      return {
        ...state,
        userId: authUserId,
        Name: Name,
        Surname: SN,
      };
    case GET_USER_INFO:
      const authUseId = action.userId;
      const nm = action.Name;
      const sN = action.Surname;
      return {
        ...state,
        userId: authUseId,
        Name: nm,
        Surname: sN,
        cards: [],
      };
    case UPDATE_USER_INFO:
      const authUseid = action.userId;
      const nmm = action.Name;
      const sNn = action.Surname;
      return {
        ...state,
        userId: authUseid,
        Name: nmm,
        Surname: sNn,
      };
    case ADD_CARD:
      const cc = new BCard(
        action.id,
        action.Name,
        action.Type,
        action.Image,
        action.Balance
      );
      return {
        ...state,
        cards: state.cards.concat(cc),
      };
    case GET_CARDS:
      return {
        ...state,
        cards: action.arr,
      };
    default:
      return state;
  }
};
