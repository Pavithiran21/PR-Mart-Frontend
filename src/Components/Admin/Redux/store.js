import { configureStore } from '@reduxjs/toolkit';
import productSlice from './Reducer/productSlice';

export const store = configureStore({
    reducer:{
        product:productSlice
    }
})

