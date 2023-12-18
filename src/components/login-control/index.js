import { memo } from "react";
import PropTypes from "prop-types";
import SideLayout from "../side-layout";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginControl({ username, authStatus, login, logout, t }) {
  const cn = bem("LoginControl");

  return (
    <SideLayout side="end">
      {authStatus ? (
        <div className={cn()}>
          <Link className={cn("link")} to="/profile">
            {username}
          </Link>
          <button onClick={logout}>{t("loginForm.logout")}</button>
        </div>
      ) : (
        <button className={cn()} onClick={() => login()}>
          {t("loginForm.title")}
        </button>
      )}
    </SideLayout>
  );
}

LoginControl.propTypes = {
  username: PropTypes.string,
  authStatus: PropTypes.bool,
  login: PropTypes.func,
  logout: PropTypes.func,
  t: PropTypes.func,
};

LoginControl.defaultProps = {
  username: "",
  authStatus: false,
  login: () => {},
  logout: () => {},
  t: (text) => text,
};

export default memo(LoginControl);
