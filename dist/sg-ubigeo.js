'use strict';

(function () {

    var module = angular.module('sg-ubigeo', ['restangular']);

    module.provider('sgUbigeo', function () {

        this.restUrl = 'http://localhost';

        this.$get = function () {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function () {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function (restUrl) {
            this.restUrl = restUrl;
        };
    });

    module.factory('UbigeoRestangular', ['Restangular', 'sgUbigeo', function (Restangular, sgUbigeo) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgUbigeo.getRestUrl());
        });
    }]);

    var RestObject = function (path, restangular, extendMethods) {
        var modelMethods = {

            /**
             * Retorna url*/
            $getModelMethods: function () {
                return modelMethods;
            },

            /**
             * Retorna url*/
            $getBasePath: function () {
                return path;
            },
            /**
             * Retorna la url completa del objeto*/
            $getAbsoluteUrl: function () {
                return restangular.one(path, this.id).getRestangularUrl();
            },
            /**
             * Concatena la url de subresource con la url base y la retorna*/
            $concatSubResourcePath: function (subResourcePath) {
                return this.$getBasePath() + '/' + this.id + '/' + subResourcePath;
            },


            $new: function (id) {
                return angular.extend({id: id}, modelMethods);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethods, {
                    $save: function () {
                        return restangular.all(path).post(this);
                    }
                });
            },

            $search: function (queryParams) {
                return restangular.all(path).customGET('search', queryParams);
            },
            $getAll: function (queryParams) {
                return restangular.all(path).getList(queryParams);
            },

            $find: function (id) {
                return restangular.one(path, id).get();
            },
            $save: function () {
                return restangular.one(path, this.id).customPUT(restangular.copy(this), '', {}, {});
            },
            $saveSent: function (obj) {
                return restangular.all(path).post(obj);
            },

            $enable: function () {
                return restangular.one(path, this.id).all('enable').post();
            },
            $disable: function () {
                return restangular.one(path, this.id).all('disable').post();
            },
            $remove: function () {
                return restangular.one(path, this.id).remove();
            }
        };

        modelMethods = angular.extend(modelMethods, extendMethods);

        function extendObject(obj, modelMethods){
            angular.extend(obj, modelMethods);
        }

        function extendArray(obj, modelMethods){
            angular.forEach(obj, function (row) {
                if (angular.isObject(row)) {
                    if (!angular.isArray(row)) {
                        extendObject(row, modelMethods);
                    }
                }
            });
        }

        function automaticExtend(obj, modelMethods){
            if (angular.isDefined(obj)) {
                if (angular.isObject(obj)) {
                    if (angular.isArray(obj)) {
                        extendArray(obj, modelMethods);
                    } else {
                        if (angular.isDefined(obj.items) && angular.isArray(obj.items)) {
                            extendArray(obj.items, modelMethods);
                        } else {
                            extendObject(obj, modelMethods)
                        }
                    }
                }
            }
        }

        restangular.extendModel(path, function (obj) {
            automaticExtend(obj, modelMethods);
            return obj;
        });

        restangular.extendCollection(path, function (collection) {
            automaticExtend(collection, modelMethods);
            return collection;
        });

        return modelMethods;
    };

    module.factory('SGUbigeo', ['UbigeoRestangular', function (UbigeoRestangular) {
        var extendMethod = {};

        var ubigeoResource = RestObject('ubigeos', UbigeoRestangular, extendMethod);
        return ubigeoResource;
    }]);

})();