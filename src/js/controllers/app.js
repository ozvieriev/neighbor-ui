angular.module('app.controllers')
    .controller('appController', ['$scope', '$state', '$stateParams', '$zendeskApi', '$brand', '$auth',
        ($scope, $state, $stateParams, $zendeskApi, $brand, $auth) => {

            $zendeskApi.init();

            if ($zendeskApi.isEmpty())
                return $state.go('zat/client-not-found');

            $zendeskApi.get(['ticket.brand']).then((response) => {

                $brand.set(response['ticket.brand']);

                if (!$brand.isSupport())
                    return $state.go('brand/not-supported');

                $scope.$auth = $auth;
                $state.go('account');

            }, () => { $state.go('ticket/not-found'); });

        }]);