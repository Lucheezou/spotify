var express = require('express');
var router = express.Router();
var request = require('request');

var path = require('path');
const fs = require('fs');
let filedir = path.join(__dirname , '..' , 'token.json');
let content = JSON.parse(fs.readFileSync(filedir, 'utf8'))

/* GET song playing. */

router.get('/', function(req, res, next) {
  

          let refresh_token = content.refresh_token
          var client_id = '84e0909b98df4116a0c5028239dc034f';
          var client_secret = '3cf0af0dec724c6f8114f48a8c3a85e1';
          console.log("Refresh Token : " + refresh_token)

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
              console.log("Access Token : " + access_token)
              if (body.refresh_token){
                console.log("refreshed token")
                refresh_token = body.refresh_token;
                content.refresh_token = refresh_token;
                fs.writeFileSync(filedir, JSON.stringify(content));
              }

              var options = {
                url: 'https://api.spotify.com/v1/me/player/currently-playing',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
              };

              request.get(options, function(error, response, body) {
                console.log(body);
                res.json(body)
              });
          });
        
      
      
      }
        
        
        
        
        )
          

 


module.exports = router;
