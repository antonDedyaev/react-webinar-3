import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural, getLocale } from "../../utils";
import * as locales from "../../app/locales/exports";
import "./style.css";

function BasketTool(props) {
  const cn = bem("BasketTool");

  const { page, cartControl } = getLocale(props.language, locales);

  return (
    <div className={cn()}>
      <Link className={cn("link")} to="/">
        {page.main}
      </Link>
      <span className={cn("label")}>{cartControl.cartContent}:</span>
      <span className={cn("total")}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${numberFormat(props.sum)} ₽`
          : `${cartControl.cartEmpty}`}
      </span>
      <button onClick={props.onOpen}>{cartControl.cartOpen}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  language: "ru",
};

export default memo(BasketTool);
