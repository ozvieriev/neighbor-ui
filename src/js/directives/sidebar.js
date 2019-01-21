angular.module('app.directives')
    .directive('ngSidebar', ['$api', ($api) => {

        return {
            restrict: 'A',
            link: (scope, element, attrs) => {

                var sidebar = element.find('.sidebar:first, .sidebar-content');
                var buttons = element.find('button.navbar-toggler');

                buttons.eq(0).bind('click', function () {
                    sidebar.css({ height: '100%' });
                });

                element.find('.btn').bind('click', function () {
                    sidebar.css({ height: '0%' });
                })
                buttons.eq(1).bind('click', function () {
                    sidebar.css({ height: '0%' });
                });
            }
        };
    }]);