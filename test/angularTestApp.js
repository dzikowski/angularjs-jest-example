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

const render = ($compile, $scope) => (html) => {
  const element = $compile(html)($scope);
  $scope.$digest();

  element.normalizedText = () =>
    element.text().replace(/\s+/g, ' ').trim();

  element.minified = () =>
    createElementFromHTML(minifyHtml(element.html()));

  return element;
};

const eventually = ($scope) => (fn, interval, limit) =>
  new Promise((resolve, reject) => {
    const check = (iteration = 0) => {
      $scope.$digest();
      try {
        resolve(fn());
      } catch (e) {
        if (iteration >= limit) {
          console.warn(iteration, 'reached with exception');
          reject(e);
        } else {
          setTimeout(() => check(iteration + 1), interval);
        }
      }
    };

    check();
  });

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

  angular.mock.inject(['$rootScope', '$compile', ...otherNames, ($rootScope, $compile, ...other) => {
    app.$scope = $rootScope.$new();

    otherNames.forEach((name, index) => {
      app[name] = other[index];
    });

    app.render = (html) =>
      render($compile, app.$scope)(html);

    app.eventually = (fn, { interval, limit } = { interval: 0, limit: 10 }) =>
      eventually(app.$scope)(fn, interval, limit);
  }]);

  return app;
};
