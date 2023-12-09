import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { getLocale } from "../../utils";
import * as locales from "../../app/locales/exports";
import "./style.css";

function MainMenu({ language }) {
  const cn = bem("MainMenu");
  const { page } = getLocale(language, locales);

  return (
    <Link className={cn()} to="/">
      {page.main}
    </Link>
  );
}

MainMenu.propTypes = {
  language: PropTypes.string,
};

MainMenu.defaultProps = {
  language: "ru",
};

export default memo(MainMenu);
