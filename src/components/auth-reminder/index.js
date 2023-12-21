import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";

function AuthReminder({ withCancel, t }) {
  const cn = bem("AuthReminder");

  return (
    <div className={cn()}>
      <Link to="/login" state={{ back: location.pathname }}>
        {t("comments.reminder.link")}
      </Link>
      <span>{`, ${t("comments.reminder.text")}.`}</span>
      {withCancel && <a href="">{t("comments.cancel")}</a>}
    </div>
  );
}

AuthReminder.propTypes = {
  withCancel: PropTypes.bool,
  t: PropTypes.func,
};

AuthReminder.defaultProps = {
  withCancel: false,
  t: (text) => text,
};
export default memo(AuthReminder);
