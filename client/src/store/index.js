import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./slices/heroesSlice";

const reducer = { heroData: heroesReducer };

const store = configureStore({ reducer });
console.log('store', store);

export default store;
