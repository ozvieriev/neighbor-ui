angular
    .module('app.services')
    .factory('$api', ['$http', '$brand', function factory($http, $brand) {

        var service = {};

        var accountStatusEnum = {
            none: 0,
            isActivated: 1 << 0,
            isAnonymous: 1 << 1,
            isBusiness: 1 << 2
        };;

        service.account = {
            isActivated: (account) => {

                return !!(account.status & accountStatusEnum.isActivated);
            },
            isBusiness: (account) => {

                return !!(account.status & accountStatusEnum.isBusiness);
            },
            get: (params) => {

                var method = 'api/account/';

                if (params.accountId) {

                    method += params.accountId;
                    delete params.accountId;
                }

                return $http.get($brand.getApiUri(method), {
                    asJson: true,
                    params: params
                });
            }
        };
        service.account.getSubEmails = (params) => {

            return $http.get($brand.getApiUri(`api/account/${params.accountId}/sub-email`), {
                asJson: true
            });
        };
        service.account.getExternalSessionTokens = (params) => {

            return $http.get($brand.getApiUri(`api/account/${params.accountId}/external/session-token`), {
                asJson: true
            });
        };

        return service;
    }]);