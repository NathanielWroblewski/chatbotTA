ChatbotTA
===

A chatbot teaching assistant to answer student questions via slack

Setup
---

To run locally, you'll need:
  - [`node` and `npm`](https://nodejs.org/en/)
  - [A Slack API key & bot user](https://api.slack.com/bot-users)

First, export your Slack API key:

```sh
$ export SLACK_API_TOKEN="your-slack-api-key-goes-here"
```

Install dependencies:

```sh
$ npm install
```

Then, run the script:

```sh
$ node slackbot.js
```

Chat with your bot via direct message in [Slack](https://slack.com/).  Ask it a question, and it will respond.


Setting up your own Watson instance
===

For setting up your own instance of the Watson Retrieve and Rank API, grab your
credentials (username and password) from [Bluemix](http://www.ibm.com/cloud-computing/bluemix/).

First, you'll need to create the Redis cluster:
```
$ curl -X POST -u "{username}":"{password}" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters" -d ""
```

You'll get a redis cluster id in return.  You'll need that for the following commands.

Next, you'll need to configure the Redis cluster and set the schema.

```sh
$ curl -X POST -H "Content-Type: application/zip" -u "{username}":"{password}" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/{solr_cluster_id}/config/example_config" --data-binary @./solr_config.zip
```

Create a collection:

```sh
$ curl -X POST -u "{username}":"{password}" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/{solr_cluster_id}/solr/admin/collections" -d "action=CREATE&name=example_collection&collection.configName=example_config"
```

Then you'll need to parse the forum data into questions and answers. Unzip the forum dataset located at `./forum_data/forum_data.tar.gz`

Use the `parse_answers` awk progfile to parse the data for answers into a
new `parsed_answers.json`:

```sh
$ awk -f parse_answers ./forum_data/forum_node.tsv > ./forum_data/parsed_answers.json
```

Use the `parse_questions` awk progfile to parse the data for questions with which to train Watson into a
new `parsed_questions.csv`:

```sh
$ awk -f parse_questions ./forum_data/forum_node.tsv > ./forum_data/parsed_questions.csv
```

Upload the answers to Watson:

```sh
$ curl -X POST -H "Content-Type: application/json" -u "{username}":"{password}" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/{solr_cluster_id}/solr/example_collection/update" --data-binary @./forum_data/parsed_answers.json
```

Train watson using the following [script](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/retrieve-rank/resources/train.py).

```sh
$ python ./train.py -u {username}:{password} -i ./forum_data/parsed_questions.csv -c {solr_cluster_id} -x example_collection -n "example_ranker"
```

Training will take time (+20min).

You can then lob questions against the watson endpoint:

```sh
$ curl https://{username}:{password}@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/{solr_cluster_id}/solr/example_collection/select?&wt=json&fl=answer&q={your question for watson goes here}
```

![Example watson response](https://raw.githubusercontent.com/NathanielWroblewski/chatbotTA/master/watson-response.png)

Or you can chat it up with the bot directly:

![Example bot response](https://raw.githubusercontent.com/NathanielWroblewski/chatbotTA/master/bot-response.png)


