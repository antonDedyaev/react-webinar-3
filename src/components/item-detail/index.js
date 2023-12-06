import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { numberFormat, getLocale } from "../../utils";
import * as locales from "../../app/locales/exports";
import "./style.css";

function ItemDetail(props) {
  const cn = bem("ItemDetail");

  const { article } = getLocale(props.language, locales);

  const callbacks = {
    onAdd: (e) => props.onAdd(props.article._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>
        {props.language === "ru"
          ? props.article.description.ru
          : props.article.description.en}
      </div>
      <div className={cn("country")}>
        {article.manufacturer}:{" "}
        <b>
          {props.article.madeIn.title &&
            (props.language === "ru"
              ? props.article.madeIn.title.ru
              : props.article.madeIn.title.en)}{" "}
          ({props.article.madeIn.code})
        </b>
      </div>
      <div className={cn("category")}>
        {article.category}:{" "}
        <b>
          {props.article.category.title &&
            (props.language === "ru"
              ? props.article.category.title.ru
              : props.article.category.title.en)}
        </b>
      </div>
      <div className={cn("year")}>
        {article.year}: <b>{props.article.edition}</b>
      </div>
      <div className={cn("price")}>
        {article.price}: {numberFormat(props.article.price)} ₽
      </div>
      <button className={cn("add")} onClick={callbacks.onAdd}>
        {article.add}
      </button>
    </div>
  );
}

ItemDetail.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.object,
    description: PropTypes.object,
    price: PropTypes.number,
    edition: PropTypes.number,
    category: PropTypes.object,
    madeIn: PropTypes.object,
  }).isRequired,
  language: PropTypes.string,
  onAdd: propTypes.func,
};

ItemDetail.defaultProps = {
  onAdd: () => {},
  language: "ru",
};

export default memo(ItemDetail);
