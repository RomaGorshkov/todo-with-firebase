import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/RoutesComponent";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { onAuthStateChanged } from "firebase/auth";

import type { User } from "./types";
import { auth } from "./firebase/firebaseConfig";
import Preloader from "./components/shared/Preloader/Preloader";
import { setAuthState } from "./store/reducers/auth";
import { fetchUserTodos } from "./store/slices/todosSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthReady } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          displayName: firebaseUser.displayName ?? "",
        };
        dispatch(setAuthState(appUser));
        dispatch(fetchUserTodos(firebaseUser.uid));
      } else {
        dispatch(setAuthState(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!isAuthReady) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;
