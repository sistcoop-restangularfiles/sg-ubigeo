'use strict';

(function(){

    var module = angular.module('sg-ubigeo', ['restangular']);

    module.provider('sgUbigeo', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });

    module.factory('UbigeoRestangular', ['Restangular', 'sgUbigeo', function(Restangular, sgUbigeo) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgUbigeo.getRestUrl());
        });
    }]);

    module.factory('SGUbigeo', ['UbigeoRestangular',  function(UbigeoRestangular) {

        var url = 'departamentos';
        var urlCount = url + '/count';

        var modelMethos = {
            $find: function(ubigeo){
                return UbigeoRestangular.one(url, ubigeo).get();
            },
            $search: function(queryParams){
                return UbigeoRestangular.all(url).getList(queryParams);
            },

            $getProvincias: function(){
                return UbigeoRestangular.all(url+'/'+this.ubigeoDepartamento+'/provincias').getList();
            },
            $getDistritos: function(codigoDepartamento, codigoProvincia){
                return UbigeoRestangular.all('departamentos/'+codigoDepartamento+'/'+url+'/'+codigoProvincia+'/distritos').getList();
            }

        };

        UbigeoRestangular.extendModel(url, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);


})();