var Botkit     = require('botkit'),
    controller = Botkit.slackbot(),
    bot = controller.spawn({
      token: process.env.SLACK_API_TOKEN
    });

const KEYWORDS = ['\\?'],
      MENTIONS = ['direct_message', 'direct_mention', 'mention', 'ambient'];

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(KEYWORDS, MENTIONS, function (bot, message) {
  // send message to Watson
  bot.reply(message, 'You used a keyword!');
});
