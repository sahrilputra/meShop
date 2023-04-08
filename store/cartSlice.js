// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     cartItems: [],
// };
// export const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         // addToCart(state, action) {
//         //     state.cartItems.push(action.payload);
//         // },
//         addToCart(state, action) {
//             if (!state.cartItems) {
//               state.cartItems = [];
//             }
//             state.cartItems = [...state.cartItems, action.payload];
//           },
//         updateCart(state, action) {
//             state.cartItems = action.payload;
//         },
//         emptyCart(state, action) {
//             state.cartItems = [];
//         },
//     },
// });

// export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
        if (!state.cartItems) {
          state.cartItems = [];
        }
        state.cartItems = [...state.cartItems, action.payload];
      },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;