
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const config = require( "../json/config.json" )
module.exports = {
	name: 'start',
	async execute(message, args) {
        $.ajax({
            url: config.server+"/getall.php",
            method: "GET",
            data: {
            },
            success: function(data) {
                console.log(data)
                var json = JSON.parse(data)
                if(json.hasOwnProperty(message.author.id)) {
                    message.channel.send("You are already added to our database!")
                } else {
                    usertemplate = {
                        bal: 1000,
                        name: message.author.tag,
                        inv: {},
                        id: message.author.id
                    }
                    $.ajax({
                        url: config.server+"/adduser.php",
                        method: "POST",
                        data: {
                            sub2coder: "sub2codergautamonyoutube",
                            id: message.author.id,
                            json: JSON.stringify(usertemplate)
                        },
                        success: function(data) {
                          if(JSON.parse(data).success) {
                            message.channel.send("You have been added to the database!\nWelcome to 8k Currency Game! ")
                          } else {
                            message.channel.send("Your account couldn't be created") 
                          }
                            
                                
                            
                            
                        },
                        error: function(err) {
              
                            message.channel.send("Something Went Wrong... ")
                        }

                    })
                }
            }
          });

    }
}