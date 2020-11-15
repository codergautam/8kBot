const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const config = require( "./json/config.json" )

module.exports = {
    name: 'api',
    convertMS(milliseconds) {
        
            var day, hour, minute, seconds;
            seconds = Math.floor(milliseconds / 1000);
            minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            hour = Math.floor(minute / 60);
            minute = minute % 60;
            day = Math.floor(hour / 24);
            hour = hour % 24;
        
        return(`${(day == 0 ? `` : `${day} days `)}${(hour == 0 ? `` : `${hour} hrs `)}${(minute == 0 ? `` : `${minute} mins `)}${seconds} secs`)
            
        
    },
    getUser(id) {
   
        return new Promise((resolve, reject) => {

            $.ajax({
                url: config.server+"/getall.php",
                method: "GET",
                data: {
                },
                success: function(dta) {
                    try {
                        var json = JSON.parse(dta)
                    } catch {
                        reject({type:-1})
                    }
            
                    if(json.hasOwnProperty(id.toString())) {
                        resolve(json[id])
                         } else {
             reject({type: 0})
                             
                         
                 }
                
                },
                error: function() {
                    reject({type: -1})
                }
            })
          
                
    
                    
            


    
        })

        
    },
    modUser(id, obj) {
        return new Promise((resolve, reject) => {
      
            $.ajax({
                url: config.server+"/moduser.php",
                method: "POST",
                data: {
                    sub2coder: "sub2codergautamonyoutube",
                    id: id,
                    json: JSON.stringify(obj)
                },
                success: function(json) {
                    
            
                        var data = JSON.parse(json);
                   
                   
                    if(data.success) {
                        module.exports.getUser(id)
                        .then((user) => {
                            resolve(user)
                        })
                        .catch(() => {
                            resolve()
                        })
                    } else {
                        reject({type: 0})
                    }
                
                },
                error: function() {
                    reject({type: -1})
                }
            })
        })

        
    
    },
    addCool(id, name, ms) {
        return new Promise((resolve, reject) => {

module.exports.getUser(id)
.then((user) => {
    if(!user.hasOwnProperty("cooldown")) {
        user.cooldown = {}
    }
user.cooldown[name] = {
    started: Date.now(),
    ms: ms
}
module.exports.modUser(id, user)
.then(() => {
resolve(user)
})
.catch((err) => {
    reject(err)
})
})
.catch((err) => {
reject(err)
}) 

    })
       
    },
    checkCool(id, name) {
        return new Promise((resolve, reject) => {
module.exports.getUser(id)
.then((user)=> {
    if(!user.hasOwnProperty("cooldown")) {
        user.cooldown = {}
    }
    if(user.cooldown.hasOwnProperty(name)) {
        var dacooldown = user.cooldown[name]
        if(dacooldown.started+dacooldown.ms<=Date.now()) {
            //if(dacooldown.started+10000<=Date.now()) {
            //No cooldown
            resolve({cooldown: false})
        } else {
            //cooldown
          
            resolve({cooldown: true, msleft: dacooldown.started+dacooldown.ms-Date.now(), ms: dacooldown.ms})
            //resolve({cooldown: true, msleft: dacooldown.started+10000-Date.now(), ms: dacooldown.ms})
        }
    } else {
        resolve({cooldown: false})
    }
})
.catch((err) => {
    reject(err)
})
                    })
                      
        
    },
    changeBal(id, amount) {
        return new Promise((resolve, reject) => {
module.exports.getUser(id)
.then((user) => {
    if(typeof amount == "number" && Number.isInteger(amount)) {
        if(user.bal + amount < 0) {
            reject({type: 2})
            //will be bankrupt
        } else {
            user.bal = user.bal + amount
            module.exports.modUser(id, user)
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
            
        }
    }  else {
        reject({type: 1})
        //not number
    }
})
.catch((err) => {
    reject(err)
})
 
    })

    },
    getAll() {
        return new Promise((resolve, reject) => {
        $.ajax({
            url: config.server+"/getall.php",
            method: "GET",
            data: {
            },
            success: function(json) {
                try {
                    var data = JSON.parse(json)
                } catch {
                    reject({type: -1})
                }
                resolve(data)
            },
            error: function() {
                reject({type: -1})
            }
        })
    })
    },
    userExists(id) {
        return new Promise((resolve, reject) => {
        $.ajax({
            url: config.server+"/getall.php",
            method: "GET",
            data: {
            },
            success: function(dta) {
                try {
                    var json = JSON.parse(dta)
                } catch {
                    return(undefined)
                }
        
                if(json.hasOwnProperty(id.toString())) {
                    resolve(true)
                     } else {
         resolve(false)
                         
                     
             }
            
            },
            error: function() {
               reject()
            }
        
        })
    })
      
            

                
        



    },
    storeData(id, name, data) {
         return new Promise((resolve, reject) => {
             module.exports.getUser(id)
             .then((user) => {
                if(!user.hasOwnProperty("data")) {
                    user.data = {}
                }
                user.data[name] = data
                module.exports.modUser(id, user)
                .then(() => {
                    resolve()
                })
                .catch((err) =>{
                    reject(err)
                })
             })
             .catch((err) => {
                reject(err)
             })
         })
    },
    readData(id, name) {
        return new Promise((resolve, reject) => {
            module.exports.getUser(id)
            .then((user) => {
               if(!user.hasOwnProperty("data")) {
                   user.data = {}
               }
               if(user.data.hasOwnProperty(name)) {
                   resolve({exists: true, data: user.data[name]})
               } else {
                resolve({exists: false})
               }
            })
            .catch((err) => {
               reject(err)
            })
        })
    },
    createUser(id, username) {
        return new Promise((resolve, reject)=> {
            var usertemplate = {
                bal: 1000,
                name: username,
                inv: {},
                id: id
            }
            $.ajax({
                url: config.server+"/adduser.php",
                method: "POST",
                data: {
                    sub2coder: "sub2codergautamonyoutube",
                    id: id,
                    json: JSON.stringify(usertemplate)
                },
                success: function(data) {
                  if(JSON.parse(data).success) {
                   resolve
                  } else {
                    reject(1)
                  }
                    
                        
                    
                    
                },
                error: function(err) {
                    reject(err)
                }
    
            })
        })
 
    }
        
    }

