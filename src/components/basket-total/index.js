import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, getLocale } from "../../utils";
import * as locales from "../../app/locales/exports";
import "./style.css";

function BasketTotal(props) {
  const cn = bem("BasketTotal");

  const { cart } = getLocale(props.language, locales);

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{cart.total}</span>
      <span className={cn("cell")}> {numberFormat(props.sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
  language: "ru",
};

export default memo(BasketTotal);
