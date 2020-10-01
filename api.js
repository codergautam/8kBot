
const fs = require('fs')
module.exports = {
    name: 'api',
    getUser(id) {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
                
    
                    
                var json = JSON.parse(data)
                if(json.hasOwnProperty(id)) {
               resolve(json[id])
                } else {
    reject({type: 0})
                    
                
        }

    
        })

        
    },
    modUser(id, obj) {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
                    
                var json = JSON.parse(data)
                if(json.hasOwnProperty(id)) {
               //exists
               json[id] = obj;
               fs.writeFileSync('./json/main.json', JSON.stringify(json))
                   resolve(obj)
              
                } else {
    reject()
                    
                
        }

    
        })

        
    
    },
    addCool(id, name, ms) {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
           
    
                    
                var json = JSON.parse(data)
                if(json.hasOwnProperty(id)) {
               
                    json[id].cooldown[name] = {
                        started: Date.now(),
                        ms: ms
                    }
                    fs.writeFileSync('./json/main.json', JSON.stringify(json))
                        resolve(json[id])
                    
                    


                } else {
    reject()
                    
                
        }

    })
       
    },
    checkCool(id, name) {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
      
    
                    
                var json = JSON.parse(data)
                if(json.hasOwnProperty(id)) {
                    if(json[id].cooldown.hasOwnProperty(name)) {
                        var dacooldown = json[id].cooldown[name]
                        if(dacooldown.started+dacooldown.ms<=Date.now()) {
                 
                            //No cooldown
                            resolve({cooldown: false})
                        } else {
                            //cooldown
                          
                            resolve({cooldown: true, msleft: dacooldown.started+dacooldown.ms-Date.now(), ms: dacooldown.ms})
                        }
                    } else {
                        resolve({cooldown: false})
                    }
                    
                } else {
                    reject(2)
                            
                                
                        }
           
                    })
                      
        
    },
    changeBal(id, amount) {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
            
    
                    
                var json = JSON.parse(data)
                if(json.hasOwnProperty(id)) {
               
                    if(typeof amount == "number" && Number.isInteger(amount)) {
                        if(json[id].bal + amount < 0) {
                            reject({type: 2})
                            //will be bankrupt
                        } else {
                            json[id].bal = json[id].bal + amount
                            fs.writeFileSync('./json/main.json', JSON.stringify(json))
                                resolve(json[id])
                            
                        }
                    }  else {
                        reject({type: 1})
                        //not number
                    }


                } else {
    reject({type: 0})
                    //no acc
                
        }
 
    })

    },
    getAll() {
        return new Promise((resolve, reject) => {
            var data = fs.readFileSync('./json/main.json')
            
                    var all = JSON.parse(data)
                    resolve(all)
                
        
        })
    }
}
