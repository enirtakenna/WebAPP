/*
 * Constants
 */

var apiKey = '6aaxaiGU3sCKM6uusRotgwpSWxj3x6OI';
var myDB = 'mongodb://<enirtakenna>:<limpistol>@ds163694.mlab.com:63694/mydb';
var myCollection = 'contacts';

var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null};



/*
 * Model
 */


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
setState({
  contacts: [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
  ],
  newContact: Object.assign({}, CONTACT_TEMPLATE),
});



/*
 * Actions
 */


function updateNewContact(contact) {
  setState({ newContact: contact });
}


function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});
  
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"]
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"]
  }

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  )
/* Where to put me :-) ANVA*/
    let contactDocument = {
        name: contact.name,
        email: contact.email,
        description: contact.description,
        _id: contact.email
    };
    $.ajax( {
        url:'https://api.mlab.com/api/1/databases/'+myDB+'/collections/'+myCollection+'?apiKey='+apiKey,
        data: JSON.stringify( [ contactDocument ] ),
        type: 'POST',
        contentType: 'application/json'
    } );

}
