var express = require('express');
var router = express.Router();
var querystring = require('querystring');

/* GET TOKEN. */
router.get('/', function(req, res, next) {
  

  var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var client_id = '84e0909b98df4116a0c5028239dc034f';
  var redirect_uri = 'http://127.0.0.1:3000/playing';
  
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email user-read-currently-playing';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));



});

module.exports = router;




