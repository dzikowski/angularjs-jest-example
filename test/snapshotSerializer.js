import { minify } from 'html-minifier';

const minifyHtml = (html) =>
  minify(html, {
    collapseWhitespace: true,
    removeComments: true,
  });

/* global document:true */
const createElementFromHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export default {
  test(value) {
    return typeof value.html === 'function';
  },
  print(value, serialize) {
    const minified = minifyHtml(value.html());
    const element = createElementFromHTML(minified);
    return serialize(element);
  },
};
