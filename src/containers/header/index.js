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
    username: state.user.data?.username,
  }));

  const callbacks = {
    login: useCallback(() => navigate("/login"), [store]),
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <LoginControl
      username={select.username}
      login={callbacks.login}
      logout={callbacks.logout}
      t={t}
    />
  );
}

export default memo(Header);
