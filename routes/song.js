var express = require('express');
var router = express.Router();
var request = require('request');

/* GET song playing. */

router.get('/', function(req, res, next) {
  var redirect_uri = 'http://127.0.0.1:3000/playing';
  var client_id = '84e0909b98df4116a0c5028239dc034f';
  var client_secret = '3cf0af0dec724c6f8114f48a8c3a85e1';
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;
            console.log("Access Token : "+access_token)

            var options = {
              url: 'https://api.spotify.com/v1/me/player/currently-playing?',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          res.send(body)
        });
      }

      else{
          var refresh_token = req.query.refresh_token;
          var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
            form: {
              grant_type: 'refresh_token',
              refresh_token: refresh_token
            },
            json: true
          };

          
          request.post(authOptions, function(error, response, body) {
              var access_token = body.access_token;
              console.log("refreshed token")

              var options = {
                url: 'https://api.spotify.com/v1/me/player/currently-playing?',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
              };

              request.get(options, function(error, response, body) {
                console.log(body);
                res.send(body)
              });
          });
        }
      
      
      }
        
        
        
        
        )
          

 
  }


});

module.exports = router;
