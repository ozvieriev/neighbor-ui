angular.module('app.auth', []);
angular.module('app.services', []);
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.filters', []);

angular.module('app', ['ui.router',
    'app.auth', 'app.services', 'app.controllers', 'app.directives', 'app.filters'])
    .run(function ($trace, $transitions, $auth) {

        $trace.enable('TRANSITION');

        $transitions.onBefore({ to: '**' }, (transitions) => {

            // if (transitions.to().isProtected && !$auth.isAuthenticated())
            //     return transitions.router.stateService.target('user/sign-in');
        });
    })
    .config(($stateProvider, $urlRouterProvider) => {

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

        $urlRouterProvider.otherwise('/en/index');

        $stateProvider.state('app', {
            url: '/:locale',
            //templateUrl: 'index.html',
            restricted: false,
            abstract: true,
            views: {
                header: {
                    templateUrl: 'partial/header.html'
                },
                main: {
                    controller: 'appController',
                },
                footer: {
                    templateUrl: 'partial/footer.html'
                }
            }
        });

        var _state = (json) => {

            json.name = json.name || json.url;
            json.params = json.params || {};
            json.templateUrl = json.templateUrl || `views/${json.url}.html`;
            json.isProtected = !!json.isProtected;

            var state = {
                parent: 'app',
                url: `/${json.url}`,
                params: json.params,
                templateUrl: json.templateUrl,
                isProtected: json.isProtected
            };

            if (json.controller)
                state.controller = `${json.controller}Controller`;

            $stateProvider.state(json.name, state);
        };

        _state({ url: 'account/recover-password', controller: 'recoverPassword' });
        _state({ url: 'account/sign-in', controller: 'accountSignIn' });
        _state({ url: 'account/sign-up', controller: 'accountSignUp' });

        _state({ url: 'about' });
        _state({ url: 'contact-us' });
        _state({ url: 'disclaimer' });
        _state({ url: 'index', controller: 'index' });
        _state({ url: 'privacy' });
        _state({ url: 'resources' });

        // _state({
        //     url: 'account', controller: 'account', templateUrl: 'views/account/index.html',
        //     params: { accountId: null }, isProtected: true
        // });

        // _state({
        //     url: 'account/email-is-empty', controller: 'accountEmailIsEmpty',
        //     params: { email: null }, isProtected: true
        // });
        // _state({
        //     url: 'account/not-found', controller: 'accountNotFound',
        //     params: { email: null }, isProtected: true
        // });

        // _state({ url: 'brand/not-supported', controller: 'brandNotSupported' });

        // _state({ url: 'ticket/not-found', controller: 'ticketNotFound' });
        // _state({ url: 'ticket/requester-email-is-empty', controller: 'ticketRequesterEmailIsEmpty' });

        // _state({ url: 'user/sign-in', controller: 'userSignIn' });

        // _state({ url: 'zat/client-not-found', controller: 'zatClientNotFound' });
    });

//https://github.com/modularcode/modular-admin-angularjs/blob/master/src/_main.js