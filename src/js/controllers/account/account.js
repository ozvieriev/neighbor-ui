angular.module('app.controllers')
    .controller('accountController', ['$scope', '$state', '$zendeskApi', '$api', ($scope, $state, $zendeskApi, $api) => {

        $scope.isLoading = true;

        $scope.model = {
            account: null,
            subEmails: null,
            sessionTokens: null
        };

        $zendeskApi.get(['ticket.requester']).then((response) => {

            var requester = response['ticket.requester'];
            if (!requester.email)
                return $state.go('account/email-is-empty');

            $api.account.get({ email: requester.email })
                .then((json) => {

                    $scope.model.account = json;
                }, () => {
                    $state.go('account/not-found', { email: requester.email });
                });

        }, () => { $state.go('ticket/requester-email-is-empty'); });

        $scope.$watch('model.account.id', (accountId) => {

            if (!accountId) return;

            $scope.isLoading = false;
            $api.account.getSubEmails({ accountId: accountId }).then((json) => {

                $scope.model.subEmails = json;
            });
            $api.account.getExternalSessionTokens({ accountId: accountId }).then((json) => {

                $scope.model.sessionTokens = json;
            });
        });

        $scope.$on('$destroy', () => { });

    }]);