$(document).ready(function () {
    //your code here



    /* Constants */
    const apiKey = '6aaxaiGU3sCKM6uusRotgwpSWxj3x6OI';
    const myDB = 'mydb';
    const myCollection = 'todolistdb'; //ToDoDatabase

    var TASK_TEMPLATE = {description: "", errors: null};


    /* Model */

// The app's complete current state
    var state = {};

// Make the given changes to the state and perform any required housekeeping
    function setState(changes) {
        Object.assign(state, changes);

        ReactDOM.render(
            React.createElement(TasksView, Object.assign({}, state, {
                onNewTaskChange: updateNewTask,
                onNewTaskSubmit: submitNewTask,
                //onTaskDelete: deleteTask,
            })),
            document.getElementById('todolistspace')
        );
    }

// Set initial data with ajax

    $.ajax({
        url: 'https://api.mlab.com/api/1/databases/' + myDB + '/collections/' + myCollection + '?apiKey=' + apiKey,
        success: function(data) {
            // 1- take data from mLab
            let newData = [];
            // 2- prepare an array in their format
            data.forEach( (elem,index)=>{
                newData.push({
                    key:            index+1,
                    description:    elem.description
                });
            });
            // 3- for each in data -> create one in newData in their format
            console.log( 'Current data is ',newData);

            // 4- just insert the newData in their state
            setState({
                tasks: newData,
                newTask: Object.assign({}, TASK_TEMPLATE),
                //deleteTask: ,
            });
        }
    });


    /*
     * Actions
     */


    function updateNewTask(task) {
        setState({ newTask: task });
    }


    function submitNewTask() {
        // 1- the form sent all data in   contact_feature
        var task = Object.assign({}, state.newTask, {key: state.tasks.length + 1, errors: {}});

        // 2- insert contact_feature object in the state
        setState(
            Object.keys(task.errors).length === 0
                ? {
                    newTask: Object.assign({}, TASK_TEMPLATE),
                    tasks: state.tasks.slice(0).concat(task),
                }
                : { newTask: task }
        );

        // 3- convert data inside contact_feature in our format
        let taskDocument = {
            description:    task.description,
        };

        // 4- send my data into mLab (with JSON)
        $.ajax( {
            url:'https://api.mlab.com/api/1/databases/'+myDB+'/collections/'+myCollection+'?apiKey='+apiKey,
            data: JSON.stringify( taskDocument ),
            type: 'POST',
            contentType: 'application/json'
        });

    }
    $("#dashboard-button").click(function(){
        $("#todolistspace").toggle();
    });


    /*

    //Error, something with CORS Policy wont allow to delete
    function deleteTask(data) {

        $.ajax( {
            url: 'https://api.mlab.com/api/1/databases/'+myDB+'/collections/'+myCollection+'?apiKey='+apiKey,
              type: "DELETE",
              async: true,
              timeout: 300000,
              success: function (data) { alert('the task was deleted') },
              error: function (xhr, status, err) { }
        });
    }
    */


});
