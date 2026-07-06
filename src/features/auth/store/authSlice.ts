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
        },

        logout(state) {

            state.user = null;
            state.token = null;
            state.expiresAt = null;
            state.isAuthenticated = false;

            removeToken();
            localStorage.removeItem("expiresAt");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;