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

    module.factory('SGDepartamento', ['UbigeoRestangular',  function(UbigeoRestangular) {

        var url = 'departamentos';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return UbigeoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return UbigeoRestangular.one(url, this.id).customPUT(UbigeoRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return UbigeoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return UbigeoRestangular.all(url).getList(queryParams);
            },

            $count: function(){
                return UbigeoRestangular.one(urlCount).get();
            },

            $disable: function(){
                return UbigeoRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return UbigeoRestangular.one(url, id).remove();
            },

            $getProvincias: function(){
                return UbigeoRestangular.all(url+'/'+this.codigo+'/provincias').getList();
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

    module.factory('SGProvincia', ['UbigeoRestangular',  function(UbigeoRestangular) {

        var url = 'provincias';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return UbigeoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return UbigeoRestangular.one(url, this.id).customPUT(UbigeoRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return UbigeoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return UbigeoRestangular.all(url).getList(queryParams);
            },

            $count: function(){
                return UbigeoRestangular.one(urlCount).get();
            },

            $disable: function(){
                return UbigeoRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return UbigeoRestangular.one(url, id).remove();
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

    module.factory('SGDistrito', ['UbigeoRestangular',  function(UbigeoRestangular) {

        var url = 'distritos';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return UbigeoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return UbigeoRestangular.one(url, this.id).customPUT(UbigeoRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return UbigeoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return UbigeoRestangular.all(url).getList(queryParams);
            },

            $count: function(){
                return UbigeoRestangular.one(urlCount).get();
            },

            $disable: function(){
                return UbigeoRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return UbigeoRestangular.one(url, id).remove();
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