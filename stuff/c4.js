const Discord = require("discord.js")

class Board{
  constructor(player1, player2, channel, win, draw, betmoney){
    this.channel = channel
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]
    this.channel.send(new Discord.MessageEmbed().setTitle("Rendering board!!")).then(m => {
      this.m = m
      this.playing = true
      this.winf = win
      this.draw = draw
      this.betmoney = betmoney
    }).then(() => {
      this.channel.send("Loading..").then(mex => {
        this.mex = mex
        this.player1 = new Player(player1.id, "red", channel, this.m, this.mex, player1.name, this)
        this.player2 = new Player(player2.id, "blue", channel, this.m, this.mex, player2.name, this)
        this.print()
        this.game()
      })
  })
}
bruh() {
  this.player2.turn(this.playing)
  .then((data) => {
    this.removeReactions(this.player1.id)
    this.removeReactions(this.player2.id)
      this.update(data, this.player2.color, this.player2)
      .then((move) => {
        if(move) {
          this.print()
          var ch = this.check()
          if(ch == 1 || ch == 2) {
            //win
            this.win(ch)
            return
          } else if(ch == 3){
          //draw
          this.tie()
          } else {
            //continue
            this.game()
          }

        } else {
          this.channel.send(`${this.player2.name}, that area is full, try again`)
          .then((msg) => {
            this.removeReactions(this.player2.id)
            this.bruh() 
            setTimeout(() => {
              msg.delete()
            }, 5000)
          })
          
          
        }
      })
    })
}

  game(){
        this.player1.turn(this.playing)
        .then((data) => {
          this.removeReactions(this.player1.id)
          this.removeReactions(this.player2.id)
            this.update(data, this.player1.color, this.player1)
            .then((move) => {
              if(move) {
                this.print()
                var ch = this.check()
                if(ch == 1 || ch == 2) {
                  //win
                  this.win(ch)
                  return
                } else if(ch == 3){
                //draw
                this.tie()
                } else {
                  //continue
                  this.bruh()
                }
              } else {
                this.channel.send(`${this.player1.name}, that area is full, try again`)
                .then((msg) => {
                  this.removeReactions(this.player1.id)
                  this.game() 
                  setTimeout(() => {
                    msg.delete()
                  }, 5000)
                })
              }
            })

           
        })
      
     // this.check()
    
  }
  win(color) {

    this.playing = false
    var winner = (color == 1 ? this.player1 : this.player2)
    var loser = (color == 2 ? this.player1 : this.player2)
    let str = ":one::two::three::four::five::six::seven:\n\n"
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        switch (this.board[i][j]) {
          case 0:
            str += ":white_circle:"
            break;
          case 1:
            str += ":red_circle:"
            break;
          case 2:
            str += ":blue_circle:"
            break;
          case 3:
            str += ":yellow_circle:"
            break;
        }
      }
      str += "\n"
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`${winner.name} wins!`)
      .setColor("#eb4034")
      .setDescription(str)
    this.m.edit(embed)
    this.mex.delete()
    this.winf({id: winner.id, name: winner.name}, {id: loser.id, name: loser.name}, this.betmoney, this.channel)
  }
  tie() {
    this.playing = false
    let embed = new Discord.MessageEmbed()
    .setTitle(`Tie!`)
    .setDescription("GG")
    .setColor("#eb4034")
    this.m.edit(embed)
    this.mex.delete()
    this.draw(false, this.channel, this.player1, this.player2, this.betmoney)
  }
    /**
     * Returns 0 if no win, 1 if win for blue, 2 if win for red, 3 if draw
     */
  check() {
    //check if all cells are taken
    if(this.board.every(row=>row.every(cell=>cell==1 || cell ==2))) return 3;
    for (var x = 0; x < 6; x++) {
      //For each row
      for (var y = 0; y < 7; y++) {
        //for each cell in row
        if(this.board[x][y] != 0) {
          //space occupied, check

          //check right
          var n = this.board[x][y]
          if(r(x, y, this.board).s) {
            this.board = r(x, y, this.board).d
            return n
          }
          if(u(x, y, this.board).s) {
            this.board = u(x, y, this.board).d
            return n
          }
          if(dl(x, y, this.board).s) {
            this.board = dl(x, y, this.board).d
            return n
          }
          if(dr(x, y, this.board).s) {
            this.board = dr(x, y, this.board).d
            return n
          }
        }

      }
    }
    return 0
  }



  update(j, color) {
return new Promise((resolve, reject) => {
    var i = 0
    j -= 1
    //chip falling loop
    for(var k = 0; k < 6; k++){
      if(k == 5){
        //at bottom
        i = 5
        this.switchit(color, j, i)
        resolve(true)
        break
      }
      if(this.board[k][j] == 0) {
        //Current is empty 
      if(this.board[k+1][j] != 0){
        //Below is full, place here
        i = k
        this.switchit(color, j, i)
        resolve(true)
        break
      }
    } else if(k == 0) {
      //top is full, revert
      resolve(false)
      break;
    }
  }
  })
  }

  switchit(color, j, i) {
    switch (color) {
      case "red":
        this.board[i][j] = 1
        break;
      case "blue":
        this.board[i][j] = 2
        break;
      default:
        
        this.board[i][j] = 2
    }
  }


  removeReactions(id) {
      const userReactions = this.m.reactions.cache.filter(reaction => reaction.users.cache.has(id));
try {
	for (const reaction of userReactions.values()) {
		 reaction.users.remove(id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}
  }
  

  print(){
    let str = ":one::two::three::four::five::six::seven:\n\n"
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        switch (this.board[i][j]) {
          case 0:
            str += ":white_circle:"
            break;
          case 1:
            str += ":red_circle:"
            break;
          case 2:
            str += ":blue_circle:"
            break;
        }
      }
      str += "\n"
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`${this.player1.name} vs ${this.player2.name}`)
      .setColor("#eb4034")
      .setDescription(str)
    this.m.edit(embed)
  }

}

class Player {
  constructor(id, color, channel, m, mex, name, board){
    this.channel = channel
    this.id = id
    this.color = color
    this.name = name
    this.m = m
    this.mex = mex
    this.board = board
  }

turn(b){
  if(!b) return false;
    return new Promise((resolve, reject) => {
      if(b) {
        this.mex.edit(`**${this.name}**'s turn :${this.color}_circle:`)
        this.m.react('1⃣')
        .then(() => this.m.react('2⃣'))
        .then(() => this.m.react('3⃣'))
        .then(() => this.m.react('4⃣'))
        .then(() => this.m.react('5⃣'))
        .then(() => this.m.react('6⃣'))
        .then(() => this.m.react('7⃣'))
        .catch(err=>console.log(err.toString()))
      }
    this.m.awaitReactions((reaction, user)=>['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣'].includes(reaction.emoji.name) && user.id === this.id, { max: 1, time: 60000})
        .then(collected => {
          const reaction = collected.first();
              
          switch (reaction.emoji.name) {
            case '1⃣':
                resolve( 1)
              break;
            case '2⃣':
              resolve(2)
              break;
            case '3⃣':
                resolve(3)
              break;
            case '4⃣':
                resolve(4)
              break;
            case '5⃣':
                resolve( 5)
              break;
            case '6⃣':
                resolve( 6)
              break;
            case '7⃣':
                resolve(7)
              break;
          }
        
        })
        .catch(() => {
          var otherplayer = (this.id == this.board.player1.id ? this.board.player2 : this.board.player1)
          this.m.edit(new Discord.MessageEmbed().setTitle("Times up!"))
          this.mex.delete()
          this.board.draw(true, this.channel, {name: this.name, id: this.id}, {name: otherplayer.name, id: otherplayer.id}, this.board.betmoney)
        })
    })
 
  }
}

module.exports = Board

//Check helper functions

function r(x, y, b) {
var c = b[x].slice(y, y+4)
if(c.length<4) return {s: false};
var o = c.every(val => val === b[x][y])
if(o) {
  b[x][y] =3
  b[x][y+1] =3
  b[x][y+2] =3
  b[x][y+3] =3
  return {s: true, d: b}
} else {
  return {s: false}
}
}

function u(x, y, b) {
  var c = []
  c[0] = b[x][y]
  try {
  c[1] = b[x-1][y]
  c[2] = b[x-2][y]
  c[3] = b[x-3][y]
  } catch {
    return {s: false};
  }
  var o = c.every(val => val === b[x][y])
  if(o) {
    b[x][y] = 3
    b[x-1][y] = 3
    b[x-2][y] = 3
    b[x-3][y]= 3
    return {s: true, d: b}

  } else {
    return {s: false}
  }
  } 

  function dr(x, y, b) {
    var c = []
    c[0] = b[x][y]
    try {
    c[1] = b[x-1][y+1]
    c[2] = b[x-2][y+2]
    c[3] = b[x-3][y+3]
    } catch {
      return {s: false};
    }
    var o = c.every(val => val === b[x][y])
    if(o) {
     b[x][y] = 3
     b[x-1][y+1] = 3
     b[x-2][y+2] = 3
     b[x-3][y+3] = 3
     return {s: true, d: b}
    } else {
      return {s: false}
    }
    } 

    
  function dl(x, y, b) {
    var c = []
    c[0] = b[x][y]
    try {
    c[1] = b[x-1][y-1]
    c[2] = b[x-2][y-2]
    c[3] = b[x-3][y-3]
    } catch {
      return {s: false};
    }
    var o = c.every(val => val === b[x][y])
    if(o) {
    b[x][y] = 3
    b[x-1][y-1] = 3
    b[x-2][y-2] = 3
    b[x-3][y-3] = 3
    return {s: true, d: b}
    } else {
      return {s: false};
    }
    } 