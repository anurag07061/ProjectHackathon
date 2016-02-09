(function (app) {
    
    app.controller('teamCrtl', teamCrtl);

    teamCrtl.$inject = ['$scope', '$http'];

    function teamCrtl($scope, $http) {
        $scope.options = ['Started', 'In Progress', 'Done'];
        $scope.milestoneStatus = $scope.options[0];
        $scope.hideform = true;
        $scope.edit = true;
        $scope.milestone = '';
        $scope.updateMessage = false;

        var newMilestone = {};
        var team = '';
        var userId = '';

       

        function onDataFetchComplete(response) {
            $scope.memberDetail = response.data;
            
            var teamId = response.data.TeamId;
            team = response.data;
            //console.log('member detail: ', teamId);
            $http.get('/api/getTeam/'+teamId)
                .then(onTeamDetailComplete, onTeamDetailError);
            
        }

        function onTeamDetailComplete(res){
            $scope.teamDetail = res.data;
            //console.log('team detail: ', $scope.teamDetail);
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
            $http.get('/api/getMember/' + userId)
             .then(onDataFetchComplete, onDataFetchError);
        }
        function onFailureToUpdate() {
            $scope.message = "Something is wrong";
        }

        $http.get('/api/getCurrentUser')
             .then(function (result) {
                 userId = result.data.MemberId;
                 console.log(userId);
                 $http.get('/api/getMember/' + userId)
                    .then(onDataFetchComplete, onDataFetchError);
             },onTeamDetailError);

        

        $scope.editMilestone = function (milestone, teamDetail) {
            $scope.hideform = false;
            $scope.edit = false;
            $scope.updateMessage = false;
            $scope.milestoneDesc = milestone.MilestoneDescription;
            $scope.milestoneStatus = milestone.Status;
            $scope.milestone = milestone;
        };
        $scope.createNewMilestone = function () {
            $scope.updateMessage = false;
            $scope.hideform = false;
            $scope.edit = true;
            $scope.milestoneDesc = '';
            //$scope.milestoneStatus = '';
        }

        $scope.saveMilestoneStatus = function () {
            if ($scope.edit == true) {
                newMilestone.MilestoneDescription = $scope.milestoneDesc;
                newMilestone.Status = $scope.milestoneStatus;
                newMilestone.TeamId = team.TeamId;

                $http.post('/api/postMilestone/', newMilestone)
                    .then(onSuccessfullUpdate, onFailureToUpdate);
            }
            else {
                newMilestone = $scope.milestone;
                newMilestone.Status = $scope.milestoneStatus;

                $http.put('/api/editMilestone/' + newMilestone.MilestoneId, newMilestone)
                        .then(onSuccessfullUpdate, onFailureToUpdate);
            }
            

        };

        $scope.closeUpdateMsg = function(){
            $scope.updateMessage = false;
        }

        $scope.closeForm = function () {
            $scope.hideform = true;

        };
    }

})(angular.module('routerApp'));