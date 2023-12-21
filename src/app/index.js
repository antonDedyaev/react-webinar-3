import { Routes, Route } from "react-router-dom";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import Protected from "../containers/protected";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import sessionActions from "../store-redux/session/actions";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const dispatch = useDispatch();

  useInit(async () => {
    // await store.actions.session.remind();
    dispatch(sessionActions.remind());
  });

  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <Protected redirect="/login">
              <Profile />
            </Protected>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
