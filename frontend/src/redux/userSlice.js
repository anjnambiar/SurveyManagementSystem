import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('user/fetchData', async(userId) => {
    const response = await axios.get(`http://127.0.0.1:8000/login/userDetails/${userId}/`);
    return response.data;
});

export const updateUserData = createAsyncThunk('user/updateData', async(updatedUserData) =>{
    const response = await axios.patch(`http://127.0.0.1:8000/login/userDetails/${updatedUserData.userId}/`,
                {updatedUserData});
    return response.data;
})

const userSlice = createSlice({
    name : 'user',
    initialState : {
        data : null,
        loading : false,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ;
            });
        
        builder
            .addCase(updateUserData.pending, (state) => {
                state.loading = false;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});


export default userSlice.reducer;