import _ from 'lodash';

function TodosController ($scope, todosFactory) {
    let params = {
        createHasInput: false
    };

    // $scope.todos = [
    // {
    //     task: 'do dishes',
    //     isCompleted: false,
    //     isEditing: false
    // },
    // {
    //     task: 'walk the dog',
    //     isCompleted: true,
    //     isEditing: false
    // }
    // ];

    todosFactory.getTasks($scope);

    $scope.onCompletedClick = todo => {
        todo.isCompleted = !todo.isCompleted;
    };

    $scope.onEditClick = todo => {
        todo.isEditing = true;
        todo.updatedTask = todo.task;
    };

    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };

    const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todosFactory;

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}

export default TodosController;
