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

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = route => {
  let homeItem = {
    icon: '',
    name: '首页',
    to: '/home',
    meta: {
      title: '首页',
    },
  };
  let routeMetched = route.matched;
  if (routeMetched.some(item => item.name === 'home')) return [homeItem];
  let res = routeMetched.map(item => {
    let meta = { ...item.meta };
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true;
      meta.title = meta.title(route);
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta,
    };
    return obj;
  });
  return [{ ...homeItem }, ...res];
};
