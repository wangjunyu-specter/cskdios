angular.module('starter.services', [])

    .factory('locals',['$window',function($window) {
      return {
        //存储单个属性
        set: function (key, value) {
          $window.localStorage[key] = value;
        },
        //读取单个属性
        get: function (key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        //删除单个属性
        remove: function (key) {
          $window.localStorage.removeItem(key);
        },

        //存储对象，以JSON格式存储
        setObject: function (key, value) {
          $window.localStorage[key] = JSON.stringify(value);
          //$window.localStorage[key]=value;
        },
        //读取对象
        getObject: function (key) {
          return JSON.parse($window.localStorage[key] || '{}');
        },
        //删除对象
        removeObject: function (key) {
          $window.localStorage.removeItem(key);
        }
      };
    }])
