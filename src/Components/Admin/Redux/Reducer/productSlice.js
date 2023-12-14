import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:[],
    reducers:{
        createProduct: (state, action) => {
            return [...state, action.payload]; 
        },
        editProduct:(state,action) =>{
            const updatedProduct = action.payload;
            const index = state.findIndex(product => product.id === updatedProduct.id);
            
            if (index !== -1) {
                state[index] = updatedProduct;
            }
        },
        allProduct:(state,action) =>{
            return action.payload
        },
        viewProduct:(state,action) =>{
            const productId = action.payload;
           return state.find(product => product.id === productId);
        },
        deleteProduct:(state,action) =>{
            const productId = action.payload;
           return state.filter(product => product.id !== productId);
        },
        searchPrdouct:(state,action)=>{
            const searchTerm = action.payload;
           return state.filter(product => product.ProductName.includes(searchTerm));

        }
    }
})
export const{createProduct,allProduct,viewProduct,deleteProduct,editProduct,searchPrdouct} = productSlice.actions;
export default productSlice.reducer;



