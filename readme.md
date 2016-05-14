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
$ export SLACK_API_TOKEN="your-slack-api-key-goes-here"
```

Then, run the script:

```sh
$ node slackbot.js
```

Chat with your bot via direct message in [Slack](https://slack.com/).  Ask it a question, and it will respond.

Parsing the dataset
---

Unzip the forum dataset located at `./forum_data/forum_data.tar.gz`

Use the parse data awk progfile to parse the data into a new `parsed_data.tsv`:

```sh
$ awk -f parse_data ./forum_data/forum_node.tsv > parsed_data.tsv
```

