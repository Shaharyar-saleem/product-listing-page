import { useReducer, createContext } from "react";

//initial cart state

const initialState = {
  cart: {},
};

const Context = createContext({});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.id]: {
            ...action.payload,
            quantity: 1,
          },
        },
      };
    case "REMOVE_FROM_CART":
      let newCart = { ...state.cart };
      delete newCart[action.payload.id];
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
}

//context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
