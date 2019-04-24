
var USER_TEMPLATE = {userId: "", errors: null};


/* Model */

// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
    Object.assign(state, changes);

    ReactDOM.render(
        React.createElement(UsersView, Object.assign({}, state, {
            onNewUserChange: updateNewUser,
            //onNewUserSubmit: submitNewUser,
        })),
        document.getElementById('users')
    );
}

// Set initial data with ajax
/*
$.ajax({
    url: '/',
    success: function(data) {
        // 1- take data
        let newData = [];
        // 2- prepare an array
        data.forEach( (elem,index)=>{
            newData.push({
                key:            index+1, // maybe?
                userId:    elem.userId
            });
        });

        // 3-  insert the newData in state
        setState({
            users: newData,
            newUser: Object.assign({}, USER_TEMPLATE),
        });
    }
});

*/
/*
 * Actions
 */

function updateNewUser(user) {
    setState({ newUser: user });
}

function userCollapse(user){
    setState({deleteUSer: user});
}

// function for onload that submits a new user.
window.onload = updateNewUser;

// user collapse, when page is shut down
//window.onunload = userCollapse;
