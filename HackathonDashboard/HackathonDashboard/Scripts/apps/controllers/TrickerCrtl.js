(function (app) {

    app.controller('trickerCrtl', trickerCrtl);

    trickerCrtl.$inject = ['$scope', '$http'];

    function trickerCrtl($scope, $http, $log) {
        $scope.show = true;

        function onTeamListComplete(response){
            $scope.teamList = response.data;
            //console.log('teamlist: ', response.data);
        }

        function onTeamListError(reason) {
            $scope.eroor = "Could not fetch team list";
        }


        $http.get('/api/getTeams/')
             .then(onTeamListComplete, onTeamListError);

        $scope.getSingleTeamStatus = function(team) {
            $scope.teamMilestone = team;
        }
        $scope.open = function () {
            $scope.showModal = true;
        };

        $scope.ok = function () {
            $scope.showModal = false;
        };

        $scope.cancel = function () {
            $scope.showModal = false;
        };

    }

})(angular.module('routerApp'));