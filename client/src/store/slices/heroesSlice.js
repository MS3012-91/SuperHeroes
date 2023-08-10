import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../../api'
//import axios from 'axios';

//const httpClient = axios.create({baseURL: 'http://localhost:5001/api'})
const HEROES_SLICE_NAME = 'heroes';

const initialState = {
    heroes: [],
    isFetching: false,
    error: null
};
const heroesSlice = createSlice({
    name: `${HEROES_SLICE_NAME}`,
    initialState,
     //with thank loading (without will be reducers)
    extraReducers: builder => {
          //post
        builder.addCase(creayeHeroThunk.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(creayeHeroThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.heroes.push(payload);
        });
        builder.addCase(creayeHeroThunk.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.error = payload;
        });
        

        builder.addCase(getHeroesThunk.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getHeroesThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.heroes = payload;
        });
        builder.addCase(getHeroesThunk.rejected, (state, { payload }) => {
          state.isFetching = false;
          state.error = payload;
        });

        builder.addCase(deleteHeroesThunk.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(deleteHeroesThunk.fulfilled, (state, { payload }) => {
          state.isFetching = false;
          const delIndex = state.heroes.findIndex(
            (h) => h.id === payload
          );
          state.heroes.splice(delIndex, 1);
        });
        builder.addCase(deleteHeroesThunk.rejected, (state, { payload }) => {
          state.isFetching = false;
            state.error = payload;
        });

        //update
        builder.addCase(updateHeroesThenk.pending, state => {
            state.isFetching = true;
                state.error = null;
        });
        builder.addCase(updateHeroesThenk.fulfilled, (state, { payload }) => {
          state.isFetching = false;
          const updatedHeroIndex = state.heroes.findIndex(
            (h) => h.id === payload.id
          );

          state.heroes[updatedHeroIndex] = { ...payload };
        });
    }
})

export const creayeHeroThunk = createAsyncThunk(`${HEROES_SLICE_NAME}/create`,
    async (payload, { rejectWithValue }) => {
    try {
        const { data: { data: createdHero } } = await API.createHero(payload);
        console.log('payload', payload)
        return createdHero;
    }
    catch (err) {
        return rejectWithValue({ message: err.message })
    }
}
)


export const getHeroesThunk = createAsyncThunk(
    `${HEROES_SLICE_NAME}/get`,
    async (payload, {rejectWithValue}) => {
        try {
            const {data: {data: getHeroes} } = await API.getHero();
            return getHeroes; //- action payload
        }
        catch (err) {
            return rejectWithValue({message:err.message})
        }
    }
) 

export const deleteHeroesThunk = createAsyncThunk(
    `${HEROES_SLICE_NAME}/delete`,
    async (payload, { rejectWithValue }) => {
        try {
            //await httpClient.delete(`${HEROES_SLICE_NAME}/${payload}`)
            await API.deleteHero(payload);
            return payload;
        }
        catch (err) {
            console.log("err", err);
            
        }
    }
);

//patch/api/id body
export const updateHeroesThenk =  createAsyncThunk(
    `${HEROES_SLICE_NAME}/update`,
    async ({id, updatedData}, { rejectWithValue }) => {
        try {
            const {data: {data: updatedHero}} = await API.updateHero(id, updatedData);
            return updatedHero;
        }
        catch (err) {
            return rejectWithValue({ message: err.message });
        
    }}
)


export default heroesSlice.reducer;