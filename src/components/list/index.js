import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List(props) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {props.list.map((item) => (
        <div key={item.code} className={cn("Item")}>
          <Item item={item}>
            {/*Передаем кнопке название и обработчик (на добавление или удаление по коду товара) */}
            <Button handleClick={() => props.clickHandler(item.code)}>
              {props.actionTitle}
            </Button>
          </Item>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  actionTitle: PropTypes.string,
  clickHandler: PropTypes.func,
};

List.defaultProps = {
  list: [],
};

export default React.memo(List);
