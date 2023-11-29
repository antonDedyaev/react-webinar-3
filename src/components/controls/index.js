import React from "react";
import PropTypes from "prop-types";
import { calculateCartTotal, plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      {/*Если false, то элементы отображения содержимого корзины под хэдером не рендерятся */}
      {props.isControllable && (
        <>
          <span className={cn("Title")}>В корзине:</span>
          <div className={cn("Content")}>
            {props.cart.length
              ? `${props.cart.length} ${plural(props.cart.length, {
                  one: "товар",
                  few: "товара",
                  many: "товаров",
                })} / ${calculateCartTotal(props.cart)}`
              : "пусто"}
          </div>
        </>
      )}
      {props.children}
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.array,
  children: PropTypes.node,
  isControllable: PropTypes.bool,
};

Controls.defaultProps = {
  isControllable: false,
};

export default React.memo(Controls);
