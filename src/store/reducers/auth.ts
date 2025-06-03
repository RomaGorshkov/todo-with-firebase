import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types";
import { loginUser, registerUser } from "../slices/authSlice";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean; // Можна залишити або визначати на основі user !== null
  isLoading: boolean;
  isAuthReady: boolean; // <--- ВАЖЛИВО
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isAuthReady: false, // <--- Початкове значення
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAuthReady = true;
      state.isLoading = false;
      state.error = null;
    },

    logoutUserSync: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Login failed";
      });
  },
});

export const { setAuthState, logoutUserSync, clearAuthError } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
