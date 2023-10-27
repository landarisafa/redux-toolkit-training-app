import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TCart } from "../../components/CartItem";
import axios from "axios";

interface TState {
    cartItems: TCart[];
    amount: number;
    total: number;
    isLoading: boolean;
}

const initialState: TState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

const url = 'https://course-api.com/react-useReducer-cart-project';

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item: TCart) => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            if (cartItem) cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            if (cartItem) cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * +(item.price);
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, thunkAPI) => {
      try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios(url);
  
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
    cartSlice.actions;
export default cartSlice.reducer;