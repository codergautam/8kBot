const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var yts = require('yt-search');

const db = require("quick.db")
const loops = new db.table("loops")
module.exports = {
    name: "play",
    execute(msg, args) {
        try {
        if (!msg.member.voice.channel) return msg.channel.send("You're not in a voice channel?");
        const name = args.join(' ')
        msg.channel.send("🔎Searching for `"+name+"`")
        if(name == "") {
            return msg.channel.send("**No query entered**\nPlease use the command like\n`8k!play <songname>`")
        }
        yts(name)
        .then((data) => {
            if(data.videos[0]) {
                var video = data.videos[0]
                var url = video.url
                msg.channel.send("🔗Fetching video info: `"+url+"`")

                        msg.channel.send("▶️Playing: `"+video.title+"`")

                    const embed = new Discord.MessageEmbed()
                    .setTitle(video.title)
                    .setThumbnail(video.thumbnail)
                    .setDescription(`**Now playing!!**\nUploader: ${video.author.name}\nDuration: ${video.timestamp}\n\n👁️ ${video.views} views!\n\n*${video.ago}*`);
        
                    msg.channel.send(embed)
          
                    console.log(loops.get(msg.member.voice.channel.id.toString()))
                    play(url, msg, (connection, stream) => {
                        
                        if(loops.get(connection.channel.id.toString())) {
                            try {
                            replay(loops.get(connection.channel.id.toString()), url, msg, connection)
                            } catch(e) {
                                return msg.channel.send(e.toString())
                            }
                        } else {
                            msg.channel.send("Song ended! Thanks for listening")
                            return connection.channel.leave()
                        }
                    }) 


   
            } else {
                return msg.channel.send("**No results matched your search**\nTry a more generic name or enter the url of the youtube video\n`8k!play <url>`")
            }
        })
        .catch((err) => {
            msg.channel.send(err.toString())
        })
       
    } catch(e) {
        msg.channel.send(e.toString())
    }
    
    }

}
function getvid(url) {
    return new Promise((resolve, reject) => {
    try{
    ytdl(url)
    .on("error", (e) => {
      info = {
      }
       
        info.errmsg = e.toString()
        resolve(info)
    })
    .on('info', (info) => {
      
        resolve(info.videoDetails)
    
      // the video title
    });
    } catch(e) {
      info = {}
        
        info.errmsg = e.toString()
      resolve(info)
    }
})
}

function play(url, msg, callback) {
    try {
    let stream = ytdl(url, {
        filter: "audioonly"
    })
    msg.member.voice.channel.join()
    .then(connection => {
        console.log('joined channel');

        let dispatcher = connection.play(stream)
        // When no packets left to send, leave the channel.
        dispatcher.on('finish', () => {
            callback(connection)
        })
        // Handle error without crashing the app.
    })
    .catch(console.error);
} catch(e) {
    msg.channel.send(err.toString())
}
}

function replay(loop, url, msg, connection) {
    try {
    if(loop) {
        console.log('replay');
        msg.channel.send("Replaying song!")
        if(connection) {
        connection.channel.join()
        .then(connection => {
        let stream = ytdl(url, {
            filter: "audioonly"
        })
        let dispatcher = connection.play(stream)
        // When no packets left to send, leave the channel.
        dispatcher.on('finish', () => {
            replay(loops.get(connection.channel.id.toString()), url, msg, connection)
        })
    
    })
    .catch((err) => {
        return msg.channel.send(err.toString())
    })
}
    } else {
        msg.channel.send("Song ended! Thanks for listening")
        return connection.channel.leave()
    }
} catch(err) {
    return msg.channel.send(err.toString())
}
        // Handle error without crashing the app.
}