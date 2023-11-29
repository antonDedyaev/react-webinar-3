import React from "react";
import PropTypes from "prop-types";
import { displayPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("Code")}>{props.item.code}</div>
      <div className={cn("Title")}>{props.item.title}</div>
      <div className={cn("Price")}>{displayPrice(props.item.price)}</div>
      {props.item.amount && (
        <div className={cn("Amount")}>{props.item.amount} шт</div>
      )}
      <div className={cn("Actions")}>{props.children}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  children: PropTypes.node,
};

export default React.memo(Item);
