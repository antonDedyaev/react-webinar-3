import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ profile, t }) {
  const cn = bem("ProfileCard");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile.title")}</h2>
      <div className={cn("prop")}>
        <div className={cn("label")}>Имя:</div>
        <div className={cn("value")}>{profile.username}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Телефон:</div>
        <div className={cn("value")}>{profile.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email:</div>
        <div className={cn("value")}>{profile.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  t: (text) => text,
};

export default memo(ProfileCard);
