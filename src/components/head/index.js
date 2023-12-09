import { memo } from "react";
import PropTypes from "prop-types";
import LanguageSwitcher from "../language-switcher";
import "./style.css";

function Head(props) {
  return (
    <div className="Head">
      <h1>{props.title}</h1>
      {/**Добавляем переключатель языка в шапку */}
      <LanguageSwitcher
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string,
  switchLanguage: PropTypes.func,
};

Head.defaultProps = {
  language: "ru",
  switchLanguage: () => {},
};

export default memo(Head);
