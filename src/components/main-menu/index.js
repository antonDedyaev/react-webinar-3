import { memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { getLocale } from "../../utils";
import * as locales from "../../app/locales/exports";
import "./style.css";

function MainMenu(props) {
  const navigate = useNavigate();
  const cn = bem("MainMenu");
  const { page } = getLocale(props.language, locales);

  const clickHandler = () => {
    // Сбрасываем пагинацию при клике по ссылке
    props.setCurrentPage(1);
    navigate("/");
  };

  return (
    <nav className={cn()}>
      <span onClick={clickHandler}>{page.main}</span>
    </nav>
  );
}

MainMenu.propTypes = {
  language: PropTypes.string,
  setCurrentPage: PropTypes.func,
};

MainMenu.defaultProps = {
  language: "ru",
  setCurrentPage: () => {},
};

export default memo(MainMenu);
