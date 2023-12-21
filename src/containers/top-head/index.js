import { memo, useCallback } from "react";
import SideLayout from "../../components/side-layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import sessionActions from "../../store-redux/session/actions";

function TopHead() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const select = useSelector(
    (state) => ({
      user: state.session.user,
      exists: state.session.exists,
    }),
    shallowequal
  );

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      dispatch(sessionActions.signOut());
    }, []),
  };

  return (
    <SideLayout side="end" padding="small">
      {select.exists ? (
        <Link to="/profile">{select.user.profile.name}</Link>
      ) : (
        ""
      )}
      {select.exists ? (
        <button onClick={callbacks.onSignOut}>{t("session.signOut")}</button>
      ) : (
        <button onClick={callbacks.onSignIn}>{t("session.signIn")}</button>
      )}
    </SideLayout>
  );
}

export default memo(TopHead);
