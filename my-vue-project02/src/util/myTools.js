let myTools = {};

/**
 * 全局错误处理器
 *
 * @param {object} Vue vue对象
 */
myTools.errorHandler = (Vue) => {
  Vue.config.errorHandler = (error) => {
    // 控制台打印错误信息
    console.error('出错了：', error.message);
    // 打开新标签页使用Bing搜索错误信息
    window.open('https://cn.bing.com/search?q=' + error.message);
  };
};

/**
 * 获取css样式字符串
 *
 * @param {string} className css样式名称
 * @returns css样式内容字符串
 */
myTools.getCssText = (className) => {
  if (className && className == '') {
    return '';
  }
  let cssRuless = document.styleSheets[0].cssRules;
  const cssNameExec = /\w+/;
  const cssTextExec = /(?<=\{)[\w\W]*(?=\})/;
  for (let key in cssRuless) {
    let cr = cssRuless[key];
    if (cssNameExec.exec(cr.selectorText)[0] === className) {
      return cssTextExec.exec(cr.cssText)[0];
    }
  }
};

/**
 * 生成路由信息
 *
 * @returns 路由信息集合
 */
myTools.sendRoutes = () => {
  let files = require.context('../views/', false, /.vue$/);
  let routes = [];
  files.keys().forEach((k) => {
    let filesModule = files(k);
    let url = filesModule.default.__file.replace('src', '..');
    let name = filesModule.default.name;
    let names = url.substr(url.lastIndexOf('/') + 1, url.length - (url.lastIndexOf('/') + 5));
    names = names.toLowerCase();
    routes.push({
      path: name === 'Home' ? '/' : '/' + names,
      name: name,
      component: filesModule.default,
    });
  });
  return routes;
};

export default myTools;
