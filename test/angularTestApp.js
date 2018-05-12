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

/*
 * The component may require to call chain of promises to render and stabilize its state. We will keep comparing
 * previous and current rendered HTML to detect when the component stabilizes.
 *
 * Right now neither timeouts nor intervals are supported. You can provide recursion depth only.
 *
 * Note: we don't use `$q`, because it causes timeouts in this place. // TODO testit
 */
const stableElementPromise = ($q, element, scope, depth = 0, error) => {
  if (depth >= 10) {
    throw error;
  } else {
    return Promise.resolve() // You cannot use $q, because you have $q inside $q and timeouts
      .then(() => {
        const prevHtml = element.html();
        scope.$digest();
        if (element.html() === prevHtml) {
          return element;
        } else {
          throw new Error(`Component is not stable after ${depth} iterations`);
        }
      })
      .catch((e) => stableElementPromise($q, element, scope, depth + 1, e));
  }
};

export default (...modules) => (mocks, ...accessNames) => {
  // const mocks = createMocks(angular.mock);
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
