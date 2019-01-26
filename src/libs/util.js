export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode;
  if (parentNode) {
    let classList = parentNode.classList;
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode;
    } else {
      return findNodeUpperByClasses(parentNode, classes);
    }
  }
};
