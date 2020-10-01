

module.exports = {
	name: 'react',
	execute(message, _args, _client) {
        var shshsh = message.author.id
        const filter = (reaction, user) => {return user.id == shshsh}
        message.channel.send("Please type the Message ID to react to\nPlease respond within 20 seconds");
        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
        
        collector.on('collect', message => { 
        
            message.channel.messages.fetch(message.content)
  .then(messagereact => {
    message.channel.send("Please react this message with the Emoji that I should react\nPlease dont use custom emojis because I cant access them\nPlease react within 15 seconds").then(themsg => {
        const collector22 = themsg.createReactionCollector(filter, {max:1, time: 15000 });
        collector22.on('collect', reaction => { 
           
            messagereact.react(reaction.emoji)
            .then(()=>{
                message.channel.send("*Reacted*")
            })
            .catch(()=>{
                message.channel.send("Failed to React")
            })
        })
    });
  })
  .catch(() => {
      message.channel.send("Invalid message id lmfaooooooo")
  });

        })
    
    }
}