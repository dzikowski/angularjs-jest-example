import angular from 'angular';
import 'angular-mocks';
import { minify } from 'html-minifier';
import '../app/app.module';

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

const stableElementPromise = ($q, element, scope, depth = 0, error) => {
  if (depth >= 10) {
    throw error;
  } else {
    const prevHtml = element.html();
    scope.$digest();
    if (element.html() === prevHtml) {
      return element;
    } else {
      const e = new Error(`Component is not stable after ${depth} iterations`);
      return stableElementPromise($q, element, scope, depth + 1, e);
    }
  }
};

export default (...modules) => (mocks, ...accessNames) => {
  modules.forEach((module) => angular.mock.module(module));

  const mockNames = Object.keys(mocks);

  angular.mock.module(($provide) => {
    mockNames.forEach((mockName) => {
      const mockBuilder = typeof mocks[mockName] === 'function' ? mocks[mockName] : () => mocks[mockName];
      $provide.factory(mockName, mockBuilder);
    });
  });

  const app = {};

  const otherNames = [...new Set([...mockNames, ...accessNames])];

  angular.mock.inject(['$rootScope', '$compile', '$q', ...otherNames, ($rootScope, $compile, $q, ...other) => {
    app.scope = $rootScope.$new();

    otherNames.forEach((name, index) => {
      app[name] = other[index];
    });

    app.render = (html) => {
      const element = $compile(html)(app.scope);

      element.normalizedText = () =>
        element.text().replace(/\s+/g, ' ').trim();

      element.minified = () =>
        createElementFromHTML(minifyHtml(element.html()));

      return stableElementPromise($q, element, app.scope);
    };
  }]);

  return app;
};
