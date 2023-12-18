import { memo, useCallback } from "react";
import LoginControl from "../../components/login-control";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";

function Header() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    username: state.user.currentUser.username,
    authStatus: state.user.isAuth,
  }));

  const callbacks = {
    login: useCallback(
      () =>
        navigate("/login", { state: { address: window.location.pathname } }),
      [store]
    ),
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <LoginControl
      username={select.username}
      authStatus={select.authStatus}
      login={callbacks.login}
      logout={callbacks.logout}
      t={t}
    />
  );
}

export default memo(Header);
