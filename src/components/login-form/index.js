import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ formData, onChange, onSubmit, errorMessage, t }) {
  const cn = bem("LoginForm");

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2>{t("loginForm.title")}</h2>
      <div className={cn("input")}>
        <label className={cn("label")} htmlFor="login">
          {t("loginForm.username")}
        </label>
        <input
          type="text"
          id="login"
          value={formData.login}
          name="login"
          onChange={onChange}
        />
      </div>
      <div className={cn("input")}>
        <label className={cn("label")} htmlFor="password">
          {t("loginForm.password")}
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          onChange={onChange}
        />
      </div>
      {errorMessage && <span className={cn("error")}>{errorMessage}</span>}
      <button type="submit">{t("loginForm.login")}</button>
    </form>
  );
}

LoginForm.propTypes = {
  formData: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  formData: { login: "", password: "" },
  onChange: () => {},
  onSubmit: () => {},
  t: (text) => text,
};

export default memo(LoginForm);
