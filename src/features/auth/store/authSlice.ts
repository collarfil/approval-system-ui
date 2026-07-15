import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse } from "../types/auth.types";
import { getToken, removeToken, saveToken } from "@/shared/utils/token";

interface AuthState {
    user: {
        id: string;
        email: string;
    } | null;

    token: string | null;

    expiresAt: string | null;

    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: getToken(),
    expiresAt: localStorage.getItem("expiresAt"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        loginSuccess(state, action: PayloadAction<AuthResponse>) {

            state.user = {
                id: action.payload.id,
                email: action.payload.email,
            };

            state.token = action.payload.token;

            state.expiresAt = action.payload.expiresAt;

            state.isAuthenticated = true;

            saveToken(action.payload.token);
            localStorage.setItem("expiresAt", action.payload.expiresAt);
            
            // ADD THIS - Save userId for approval page
            localStorage.setItem("userId", action.payload.id);
            localStorage.setItem("userEmail", action.payload.email);
        },

        logout(state) {

            state.user = null;
            state.token = null;
            state.expiresAt = null;
            state.isAuthenticated = false;

            removeToken();
            localStorage.removeItem("expiresAt");
            
            // ADD THESE - Clear all user data
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("token");
            
            // Optional: Clear everything
            // localStorage.clear();
            
            //Redirect to login page
            window.location.href = "/login";
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;