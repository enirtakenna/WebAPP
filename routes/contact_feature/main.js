
/* Constants */
const apiKey = '6aaxaiGU3sCKM6uusRotgwpSWxj3x6OI';
const myDB = 'mydb';
const myCollection = 'contacts'; // ContactsDatabase

var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null};


/* Model */

// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ContactsView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('react-app')
  );
}

// Set initial data
/* This is new */

$.ajax({
    url: 'https://api.mlab.com/api/1/databases/' + myDB + '/collections/' + myCollection + '?apiKey=' + apiKey,
    success: function(data) {
        // 1- take data from mLab
        let newData = [];
        // 2- prepare an array in their format
        data.forEach( (elem,index)=>{
            newData.push({
                key:            index+1,
                id:             elem.email,
                name:           elem.name,
                email:          elem.email,
                description:    elem.description
            });
        });
        // 3- for each in data -> create one in newData in their format

        console.log( 'newData is ',newData);

        // 4- just insert the newData in their state
        setState({
             contacts: newData,
                 /*[
                 {key: 1, name: "Anne Katrine K. Egsvang", email: "anegs12@student.sdu.dk", description: "Owner"},
                 {key: 2, name: "Jim", email: "jim@example.com"},
             ],*/
             newContact: Object.assign({}, CONTACT_TEMPLATE),
         });
    }
});


/*
 * Actions
 */


function updateNewContact(contact) {
  setState({ newContact: contact });
}


function submitNewContact() {
    // 1- the form sent all data in   contact_feature
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});

  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact_feature's name"]
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact_feature's email"]
  }

  // 2- insert contact_feature object in the state
  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  );

  // 3- convert data inside contact_feature in our format
  let contactDocument = {
      name: contact.name,
      email: contact.email,
      description: contact.description,
      //_id: contact_feature.email
  };

  // 4- send my data into mLab (with JSON)
  $.ajax( {
      url:'https://api.mlab.com/api/1/databases/'+myDB+'/collections/'+myCollection+'?apiKey='+apiKey,
      data: JSON.stringify( contactDocument ),
      type: 'POST',
      contentType: 'application/json'
  });

}
