const e = require("express");
const request = require("node-superfetch")
require('dotenv').config()
const { Database } = require("quickmongo");
const db = new Database(process.env.MONGO);
const { production } = require("../../package.json")
db.on("ready", () => {
    console.log("Connected to MongoDB!")
})
module.exports = {
        name: 'api',
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ordinal_suffix(i) {
            var j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return "st";
            }
            if (j == 2 && k != 12) {
                return "nd";
            }
            if (j == 3 && k != 13) {
                return "rd";
            }
            return "th";
        },
        log(msg, client) {
            return new Promise((resolve, reject) => {
                if (production) {
                    client.channels.cache.get(production ? "784448037350670376" : "784447943096401921").send(msg)
                        .then(() => {
                            resolve()
                        })
                        .catch(() => {
                            resolve()
                        })
                } else {
                    resolve()
                }
            })

        },
        convertMS(milliseconds) {

            var day, hour, minute, seconds;
            seconds = Math.floor(milliseconds / 1000);
            minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            hour = Math.floor(minute / 60);
            minute = minute % 60;
            day = Math.floor(hour / 24);
            hour = hour % 24;
            if (day + hour + minute == 0) seconds = this.roundNumber(milliseconds / 1000, 2)

            return (`${(day == 0 ? `` : `${day} days `)}${(hour == 0 ? `` : `${hour} hrs `)}${(minute == 0 ? `` : `${minute} mins `)}${seconds} secs`)
            
        
        
    },
     roundNumber(num, scale) {
        if(!("" + num).includes("e")) {
          return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } else {
          var arr = ("" + num).split("e");
          var sig = ""
          if(+arr[1] + scale > 0) {
            sig = "+";
          }
          return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
      },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    getUser(id) {
   
        return new Promise((resolve, reject) => {
            module.exports.userExists(id)
            .then((bruh) => {
                if(!bruh) { reject({type: 0, errmsg: "User doesnt exist"}) } else {
                db.get(id)
                .then((data) => {
                    resolve(data)
                })
                .catch((e) => {
                    reject({
                        type: -1,
                        errmsg: e.toString(),
                        e
                    })
                })
            }
            })
            .catch((e) => {
                reject(e)
            })
        })

        
    },
    numOfUsers() {
        return new Promise((resolve, reject) => {
            db.all().then((data) => {
                resolve(data.length)
            })
            .catch((e) => {
reject({type: -1, errmsg: e.toString(), e})
            })
            
        })
        
    },
    modUser(id, obj) {
        return new Promise((resolve, reject) => {
            db.has(id)
            .then((data) => {
                if(!data) reject({type: 0, errmsg: "User doesnt exist"})
                if(obj.bal < 0) reject({type: 2, errmsg: "Not enough money"})

                db.set(id, obj)
                .then(()=> {
                    module.exports.getUser(id)
                    .then((user) => {
                        resolve(user)
                    })
                    .catch(() => {
                        resolve()
                    })
                })
                .catch((e) => {

                })
            })

 })
 .catch((e) => {
     reject({type: -1, errmsg: e.toString(), e})
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
        if(dacooldown.started+dacooldown.ms<Date.now()) {
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
       db.all()
       .then((data) => {
           resolve(data)
       })
        })
    },
    userExists(id) {
        return new Promise((resolve, reject) => {
     db.has(id)
     .then((data) => {
        resolve(data)
     })
     .catch((e) => {
         reject({type: -1, errmsg: e.toString(), e})
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
            username = username.replace("*", "\*").replace("_", "\_").replace("`", "\`")

            var usertemplate = {
                bal: 1000,
                name: username,
                inv: {},
                id: id
            }
            db.set(id, usertemplate)
            .then(() => {
                resolve(usertemplate)
            })
            .catch((e) => {
                reject({type: -1, errmsg: e.toString(), e})
            })
        })
 
    },
    deleteUser(id) {
        return new Promise((resolve, reject)=> {
        

    db.delete(id).then(() => {
        resolve()
    }).catch((e) => {
reject(e)
    })
        })
    },
    randomFromArray(array) {
        
           return array[Math.floor(Math.random()*array.length)];
        
    }
        
    }