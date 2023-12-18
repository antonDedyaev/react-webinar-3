import { Routes, Route } from "react-router-dom";
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "../components/private-route";
import React from "react";
import useInit from "../hooks/use-init";
import "./global.css";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector((state) => ({
    activeModal: state.modals.name,
    authStatus: state.user.isAuth,
  }));

  // Восстанавливаем сессию, если пользователь авторизован
  useInit(() => {
    store.actions.user.validateSession();
  }, [select.authStatus]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <PrivateRoute authStatus={select.authStatus}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
