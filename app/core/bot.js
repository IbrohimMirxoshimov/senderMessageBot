const { Telegraf, Markup } = require("telegraf");
const { TOKEN, DEV_ID, mode } = require("../config");
const bot = new Telegraf(TOKEN)

const statuses = {
  success: 0,
  error: 0,
  time: 0
}

bot
  .catch(err => {
    console.log("err", err);
  })

bot
  .use((ctx, next) => {
    if (ctx.chat.id === DEV_ID) return next()
  })
  .command("send", async ctx => {
    const sendingMessage = ctx.message.reply_to_message

    // check replied
    if (!sendingMessage) {
      return
    }

    // require ids
    const chats_ids = require("../database/constants/chats_ids.json")

    // clear stats
    statuses.success = 0
    statuses.error = 0

    let promises = chats_ids.map(id => ctx.telegram
      .copyMessage(id, ctx.chat.id, sendingMessage.message_id)
      .then(message => {
        statuses.success++
        return 1
      })
      .catch(error => {
        statuses.error++
        return 0
      })
    )

    let startTime = new Date()
    Promise.all(promises)
      .then(res => {
        let endTime = new Date()
        statuses.time = endTime - startTime;
        console.log("Spent time: " + statuses.time);
      })
  })
  .command("stat", ctx => ctx.reply(`success: ${statuses.success}\nerror: ${statuses.error}\ntime: ${statuses.time}`))
  .on("text", ctx => ctx.copyMessage(ctx.chat.id))
  .launch()
  .then(res => {
    const message = `Bot started in ${mode}`
    console.log(message);
    return bot.telegram.sendMessage(DEV_ID, message)
  })