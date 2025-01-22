import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define the cart state
interface CartState {
  items: {
    [id: number]: {
      product: Product;
      quantity: number;
    };
  };
}

// Initial state
const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ id: number; product: Product }>) => {
      const { id, product } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { product, quantity: 1 };
      }
      console.log("State after increment:",); // Log the state
    },
    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.items[id] && state.items[id].quantity > 0) {
        state.items[id].quantity -= 1;
      }
      if (state.items[id]?.quantity === 0) {
        delete state.items[id];
      }
      console.log("State after decrement:", state.items[1]); // Log the state
    },
  },
});

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
