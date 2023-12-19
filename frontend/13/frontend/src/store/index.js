import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  idToken: null,
};

const authSlice = createSlice({
  name: "authenticated",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      localStorage.setItem("Token", action.payload.idToken);
      state.idToken = action.payload.idToken;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const initialExpense = {
  expense: 0,
  higher: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpense,
  reducers: {
    addExpense(state, action) {
      if (state.expense + action.payload.expense > 1000) {
        state.higher = true;
      }
      state.expense = state.expense + action.payload.expense;
    },
    syncExpense(state, action) {
      if (action.payload.expense > 1000) {
        state.higher = true;
      }
      state.expense = action.payload.expense;
    },
    removeExpense(state, action) {
      if (state.expense + action.payload.expense < 1000) {
        state.higher = false;
      }
      state.expense = state.expense - action.payload.expense;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, expense: expenseSlice.reducer },
});

export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;

export default store;
