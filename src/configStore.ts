import { configureStore } from "@reduxjs/toolkit";
import listCours from "./Slices/showCourse";
import actionMenu from "./Slices/showCourse";
import addValueCourse from "./Slices/addCourse";
import listAccount from "./Slices/auth";
import auth from "./Slices/auth";

const store = configureStore({
  reducer: {
    auth,
    listCours,
    actionMenu,
    listAccount,
    addValueCourse,
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
