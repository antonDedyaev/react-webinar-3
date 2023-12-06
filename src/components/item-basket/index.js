import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { numberFormat, getLocale } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import * as locales from "../../app/locales/exports.js";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const { cart } = getLocale(props.language, locales);

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={`/article/${props.item._id}`}>
          {props.language === "ru" ? props.item.title.ru : props.item.title.en}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {cart.pieces}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{cart.removeItem}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.object,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  language: PropTypes.string,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  language: "ru",
  onRemove: () => {},
};

export default memo(ItemBasket);
