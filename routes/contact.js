// contact.js - Contact route module.

var express = require('express');
var router = express.Router();

// Edit contacts page route - add, delete, view contacts.
router.get('./contact/index.html', function(req, res) {
    res.send('Edit contact page');
    console.log('Successfully runned router.get contact!');
});

module.exports = router;

