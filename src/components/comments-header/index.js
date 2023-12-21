import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function CommentsHeader({ count, t }) {
  const cn = bem("CommentsHeader");

  return <div className={cn()}>{`${t("comments.title")} (${count})`}</div>;
}

CommentsHeader.propTypes = {
  count: PropTypes.number,
  t: PropTypes.func,
};

CommentsHeader.defaultProps = {
  count: 0,
  t: (text) => text,
};

export default memo(CommentsHeader);
