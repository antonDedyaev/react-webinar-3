import { memo } from "react";
import PropTypes from "prop-types";
import SideLayout from "../side-layout";
import { Link, useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginControl({ username, login, logout, t }) {
  const cn = bem("LoginControl");

  return (
    <SideLayout side="end">
      {username ? (
        <div className={cn()}>
          <Link className={cn("link")} to="/profile">
            {username}
          </Link>
          <button onClick={() => logout()}>{t("loginForm.logout")}</button>
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
  login: PropTypes.func,
  logout: PropTypes.func,
  t: PropTypes.func,
};

LoginControl.defaultProps = {
  username: "",
  login: () => {},
  logout: () => {},
  t: (text) => text,
};

export default memo(LoginControl);
