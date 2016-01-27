(function (app) {
    
    app.controller('teamCrtl', teamCrtl);

    teamCrtl.$inject = ['$scope', '$http'];

    function teamCrtl($scope, $http) {
        $scope.hideform = true;
        $scope.edit = true;
        $scope.updateMessage = false;
        var newMilestone = {};
        $scope.milestone ='';

        function onDataFetchComplete(response) {
            $scope.memberDetail = response.data;
            
            var teamId = response.data.TeamId;
            console.log('member detail: ', teamId);
            $http.get('/api/getTeam/'+teamId)
                .then(onTeamDetailComplete, onTeamDetailError);
            
        }

        function onTeamDetailComplete(res){
            $scope.teamDetail = res.data;
            console.log('team detail: ', $scope.teamDetail);
        }

        function onTeamDetailError(reason) {
            $scope.error = "Could not fetch team list";
        }

        function onDataFetchError(reason) {
            $scope.error = "Could not fetch desired data";
        }

        function onSuccessfullUpdate() {
            $scope.hideform = true;
            $scope.updateMessage = true;
            $scope.message = "Updated Successfully";
        }
        function onFailureToUpdate() {
            $scope.message = "Something is wrong";
        }

        $http.get('/api/getMember/M01')
             .then(onDataFetchComplete, onDataFetchError);

        $scope.editMilestone = function (milestone, teamId) {
            $scope.hideform = false;
            $scope.edit = false;
            $scope.updateMessage = false;
            $scope.milestoneDesc = milestone.MilestoneDescription;
            $scope.milestoneStatus = milestone.Status;
            $scope.milestone = milestone;
        };
        $scope.createNewMilestone = function () {
            $scope.hideform = false;
            $scope.edit = true;
            $scope.milestoneDesc = '';
            $scope.milestoneStatus = '';
        }

        $scope.saveMilestoneStatus = function () {
            newMilestone = $scope.milestone;
            newMilestone.Status = $scope.milestoneStatus;

            $http.put('/api/editMilestone/' + newMilestone.MilestoneId, newMilestone)
                    .then(onSuccessfullUpdate, onFailureToUpdate);

        };

        $scope.closeForm = function () {
            $scope.hideform = true;

        };
    }

})(angular.module('routerApp'));