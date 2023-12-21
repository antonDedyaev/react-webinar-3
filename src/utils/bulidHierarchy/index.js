export default function buildCommentHierarchy(comments) {
  const commentMap = {};
  const topLevelComments = [];

  comments.forEach((comment) => {
    comment.children = [];
    commentMap[comment._id] = comment;
  });

  comments.forEach((comment) => {
    if (comment.parent && commentMap[comment.parent._id]) {
      const parent = commentMap[comment.parent._id];
      parent.children.push(comment);
    } else {
      topLevelComments.push(comment);
    }
  });

  return topLevelComments;
}
