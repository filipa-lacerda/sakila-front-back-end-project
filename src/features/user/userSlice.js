import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyCustomerAPI } from "../../utils/verifyCustomerAPI";

// Server URL
const API = "http://localhost:3000";

// initialState value
const initialState = {
    userInfo: {
        mail: "",
        name: "",
        store_id: ""
    },
    status: "idle",
    loggedIn: false,
}

export const fetchUserByMail = createAsyncThunk(
    'user/fetchUserByMail',
    async (userMail) => {
        const payload = {
            email: userMail
        }
        
        //the function to fetch user on sakila
        const [customer] = await verifyCustomerAPI(API, "POST", payload)
        return customer
        
        // and if it exists make it loggedIn to true
        return {mail: "example@gmail.com", name:"John Doe", store_id: "1"}
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        testUser(state) {
            console.log("test user")
            //state.loggedIn = true
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserByMail.pending, (state) =>{
            state.status = "loading";
        }).addCase(fetchUserByMail.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.userInfo = action.payload;
            state.loggedIn = true;
        }).addCase(fetchUserByMail.rejected, (state)=>{
            state.status = "failed";
        });
    }
})

export const { testUser} = userSlice.actions
export default userSlice.reducer;