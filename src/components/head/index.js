import { memo } from "react";
import PropTypes from "prop-types";
import LanguageSwitcher from "../language-switcher";
import "./style.css";

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {/**Добавляем переключатель языка в шапку */}
      <LanguageSwitcher />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
