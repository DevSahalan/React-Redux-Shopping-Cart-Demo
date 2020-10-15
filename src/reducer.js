import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTAL } from "./actions";
import cartItems from "./cart-items";

const initialState = {
  cart: cartItems,
  amount: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  // console.log(state, action);

  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === DECREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    // console.log(`item ${action.payload.id} removed`);
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === GET_TOTAL) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        let itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount,
    };
  }

  return state;

  // switch (action.type) {
  //   case CLEAR_CART:
  //     return {
  //       ...state,
  //       cart: [],
  //     };
  //   default:
  //     return state;
  // }
};

export default reducer;
