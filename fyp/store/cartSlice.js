import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      if (itemCode in state.cart) {
        state.cart[itemCode].qty = state.cart[itemCode].qty + qty;
      } else {
        let { price, name, size, varient } = actions.payload.cart;
        state.cart[itemCode] = { qty: 1, price, name, size, varient };
      }
      
    },
    logout: (state, actions) => {
      state.value -= 1;
    },
    removeFromCart: (state,actions) => {
        console.log('remove From Cart')
        // let newCart = JSON.parse(JSON.stringify(actions.payload.cart))
        if (itemCode in state.cart) {
          state.cart[itemCode].qty = state.cart[itemCode].qty - qty
        }
        if (state[itemCode].qty <= 0) {
          state.cart[itemCode] = []
        }
    },
    clearCart: (state,actions) => {
        console.log("Cart Has Been Clear")
        state.cart = {}
    }
    
  },
});

export const { login, logout } = cartSlice.actions;
export default cartSlice.reducer;
