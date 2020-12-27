require("dotenv").config()
const DBL = require("top.gg");
const express = require("express")
const app = express()
module.exports = (client) => {
    app.listen(5000, () => {
        console.log(`8k bot website redy!!`)
      })
      app.get("/", (req, res) => {
          res.end("yo whats up my guy")
      })
      app.post("/vote", async (req, res) => {
        
        if (req.headers.authorization !== process.env.AUTH) return res.send({code: "invalid auth"})
        let user_id = req.body.user;
        let bot = req.body.bot;
        let content = `<@${user_id}> voted <@${bot}>`
        if (req.body.type === "test") content = content + '  (This is a test)'
        console.log(content)
          res.send({code: "success"});
      });
    const dbl = new DBL(process.env.DBL);
    setInterval(() => {
        dbl.postStats(client.guilds.cache.size);
    }, 1800000);
}