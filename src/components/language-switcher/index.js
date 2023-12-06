import { memo, useCallback, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";
import "./style.css";

function LanguageSwitcher() {
  const cn = bem("LanguageSwitcher");

  const store = useStore();
  const select = useSelector((state) => ({
    language: state.language.currentLanguage,
  }));

  const callbacks = {
    // Смена языка
    switchLanguage: useCallback(
      (language) => store.actions.language.setLanguage(language),
      [store]
    ),
  };

  return (
    <div className={cn()}>
      <div
        className={[
          cn("content"),
          select.language === "ru" ? "left" : "right",
        ].join(" ")}
      >
        <span onClick={() => callbacks.switchLanguage("ru")}>ru</span>
        <span onClick={() => callbacks.switchLanguage("en")}>en</span>
      </div>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  language: PropTypes.string,
};

LanguageSwitcher.defaultProps = {
  language: "ru",
};

export default memo(LanguageSwitcher);
