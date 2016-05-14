ChatbotTA
===

A chatbot teaching assistant to answer student questions via slack

Setup
---

To run locally, you'll need:
  - [`node`](https://nodejs.org/en/)
  - [A Slack API key & bot user](https://api.slack.com/bot-users)

First, export your Slack API key:

```sh
$ export SLACK_API_KEY="your-slack-api-key-goes-here"
```

Then, run the script:

```sh
$ node slackbot.js
```

Chat with your bot via direct message in [Slack](https://slack.com/).  Ask it a question, and it will respond.
