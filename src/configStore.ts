import { configureStore } from "@reduxjs/toolkit";
import listCours from "./Slices/Course";
import actionMenu from "./Slices/Course";
import auth from "./Slices/auth";

const store = configureStore({
  reducer: {
    listCours,
    auth,
    actionMenu,
  },
});

// type cho hàm dispatch
export type AppDispatch = typeof store.dispatch;
// type cho state
export type RootState = ReturnType<typeof store.getState>;

export default store;

//utility type
//ReturnType: trả vê type của object
//type abc (biến type giống var let const)
// function A(): number {
//   return 123;
// }
// // () => number
// type typeCuaHamA = ReturnType<typeof A>;
