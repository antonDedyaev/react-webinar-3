import React from "react";
import Head from "../head";
import List from "../list";
import Controls from "../controls";
import Button from "../button";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { calculateCartTotal } from "../../utils";
import "./style.css";

function Cart(props) {
  const cn = bem("Cart");
  return (
    <div className={cn()}>
      <Head title="Корзина">
        <Button handleClick={() => props.setIsActive(false)}>Закрыть</Button>
      </Head>
      <Controls />
      <List
        list={props.cart}
        actionTitle="Удалить"
        clickHandler={props.onDeleteFromCart}
      />
      <div className={cn("Summary")}>
        <span>Итого</span>
        <span>{calculateCartTotal(props.cart)}</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  onDeleteFromCart: PropTypes.func,
  setIsActive: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
};

export default React.memo(Cart);
