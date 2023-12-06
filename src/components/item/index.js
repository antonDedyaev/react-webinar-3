import { memo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, getLocale } from "../../utils";
import * as locales from "../../app/locales/exports.js";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const { page } = getLocale(props.language, locales);

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={`/article/${props.item._id}`}>
          {props.language === "ru" ? props.item.title.ru : props.item.title.en}
        </Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{page.addItem}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.object,
    price: PropTypes.number,
  }).isRequired,
  language: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  language: "ru",
  onAdd: () => {},
};

export default memo(Item);
