import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import formatDate from "../../utils/formatDate";
import "./style.css";

function CommentCard({ comment, onReply, children, t }) {
  const cn = bem("CommentCard");

  const handleClick = (e) => {
    e.preventDefault();
    onReply(comment._id);
  };

  const formattedDate = formatDate(comment.dateCreate);
  return (
    <div className={cn()}>
      <div className={cn("header")}>
        <span>{comment.author.profile.name}</span>
        <span>{formattedDate}</span>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      <a href="" className={cn("reply")} onClick={handleClick}>
        {t("comment.reply")}
      </a>
      {children}
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    author: PropTypes.object,
    parent: PropTypes.object,
    dateCreate: PropTypes.string,
    isDeleted: PropTypes.bool,
  }).isRequired,
  onReply: PropTypes.func,
  children: PropTypes.node,
  t: PropTypes.func,
};

CommentCard.defaultProps = {
  t: (text) => text,
};

export default memo(CommentCard);
