import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function LanguageSwitcher(props) {
  const cn = bem("LanguageSwitcher");

  return (
    <div className={cn()}>
      <div
        className={[
          cn("content"),
          props.language === "ru" ? "left" : "right",
        ].join(" ")}
      >
        <span onClick={() => props.switchLanguage("ru")}>ru</span>
        <span onClick={() => props.switchLanguage("en")}>en</span>
      </div>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  language: PropTypes.string,
  switchLanguage: PropTypes.func,
};

LanguageSwitcher.defaultProps = {
  language: "ru",
  switchLanguage: () => {},
};

export default memo(LanguageSwitcher);
