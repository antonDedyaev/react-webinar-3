export default function buildCommentHierarchy(comments) {
  const commentMap = {};
  const topLevelComments = [];

  comments.forEach((comment) => {
    comment.children = [];
    commentMap[comment._id] = comment;
  });

  function addDepth(comment, depth) {
    comment.depth = depth;
    comment.children.forEach((child) => addDepth(child, depth + 1));
  }

  comments.forEach((comment) => {
    if (comment.parent && commentMap[comment.parent._id]) {
      const parent = commentMap[comment.parent._id];
      parent.children.push(comment);
    } else {
      topLevelComments.push(comment);
    }
  });

  topLevelComments.forEach((comment) => addDepth(comment, 0));

  return topLevelComments;
}
