const KEYWORDS    = ['.*'],
      MENTIONS    = ['direct_message', 'direct_mention', 'mention', 'ambient'],
      WATSON_USER = process.env.WATSON_USER,
      WATSON_PASS = process.env.WATSON_PASS,
      CLUSTER_ID  = process.env.CLUSTER_ID,
      COLLECTION  = process.env.COLLECTION,
      SLACK_TOKEN = process.env.SLACK_API_TOKEN,
      URL         = 'https://' + WATSON_USER + ':' + WATSON_PASS +
        '@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/' +
        CLUSTER_ID + '/solr/' + COLLECTION + '/select?wt=json&fl=answer&q=';

var Botkit     = require('botkit'),
    controller = Botkit.slackbot(),
    request    = require('request'),
    bot        = controller.spawn({ token: SLACK_TOKEN })

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  console.log('Connected to Slack');
});

controller.hears(KEYWORDS, MENTIONS, function (bot, message) {
  let text = encodeURIComponent(message.text);

  request({ url: URL + text }, function (err, response, body) {
    if (!err) {
      bot.reply(message, JSON.parse(body).response.docs[0].answer[0]);
    }
  });
});
