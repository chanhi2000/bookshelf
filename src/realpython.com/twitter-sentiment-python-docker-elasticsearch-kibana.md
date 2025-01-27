---
lang: en-US
title: "Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana"
description: "Article(s) > Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana"
icon: fa-brands fa-python
category:
  - Python
  - DevOps
  - Docker
  - Elasticsearch
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana"
    - property: og:description
      content: "Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/twitter-sentiment-python-docker-elasticsearch-kibana.html
prev: /programming/py/articles/README.md
date: 2014-11-13
isOriginal: false
author:
  - name: 
    url : https://realpython.com
cover: https://files.realpython.com/media/twitter-sentiment-overall-pie-chart.b0ec5ebd668f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana"
  desc="This post details how to perform Twitter sentiment analysis using Python, Docker, Elasticsearch, and Kibana."
  url="https://realpython.com/twitter-sentiment-python-docker-elasticsearch-kibana"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/twitter-sentiment-overall-pie-chart.b0ec5ebd668f.png"/>

In this example, we’ll connect to the Twitter Streaming API, gather tweets (based on a keyword), [**calculate the sentiment**](/realpython.com/python-keras-text-classification.md) of each tweet, and build a real-time dashboard using the Elasticsearch DB and Kibana to visualize the results.

::: info Tools

- [<FontIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) v1.3.0
- [<FontIcon icon="fas fa-globe"/>boot2docker](https://boot2docker.io/) v1.3.0
- [<FontIcon icon="fas fa-globe"/>Tweepy](https://tweepy.org/) v2.3.0
- [<FontIcon icon="fas fa-globe"/>TextBlob](http://textblob.readthedocs.org/en/dev/) v0.9.0
- [<FontIcon icon="iconfont icon-elasticsearch"/>Elasticsearch](https://elasticsearch.org/) v1.3.5
- [<FontIcon icon="iconfont icon-elasticsearch"/>Kibana](https://elasticsearch.org/overview/kibana/) v3.1.2

:::

---

## Docker Environment

Follow the [<FontIcon icon="fa-brands fa-docker"/>official Docker documentation](https://docs.docker.com/installation/mac/) to install both Docker and boot2docker. Then with boot2docker up and running, run `docker version` to test the Docker installation. Create a directory to house your project, grab the Dockerfile from the [repository (<FontIcon icon="iconfont icon-github"/>`realpython/twitter-sentiment-elasticsearch`)](https://github.com/realpython/twitter-sentiment-elasticsearch), and build the image:

```sh
docker build -rm -t=elasticsearch-kibana .
```

Once built, run the container:

```sh
docker run -d -p 8000:8000 -p 9200:9200 elasticsearch-kibana
```

Finally, run the next two commands in new terminal windows to map the IP address/port combo used by the boot2docker VM to your localhost:

```sh
boot2docker ssh -L8000:localhost:8000
boot2docker ssh -L9200:localhost:9200
```

Now you can access Elasticsearch at `http://localhost:9200` and Kibana at `http://localhost:8000`.

---

## Twitter Streaming API

In order to access the [<FontIcon icon="fa-brands fa-x-twitter"/>Twitter Streaming API](https://dev.twitter.com/streaming/overview), you need to register an application at [http://apps.twitter.com](http://apps.twitter.com). Once created, you should be redirected to your app’s page, where you can get the consumer key and consumer secret and create an access token under the “Keys and Access Tokens” tab. Add these to a new file called *config.py*:

```py
consumer_key = "add_your_consumer_key"
consumer_secret = "add_your_consumer_secret"
access_token = "add_your_access_token"
access_token_secret = "add_your_access_token_secret"
```

::: note

Since this file contains sensitive information do **not** add it to your Git repository.

:::

According to the Twitter Streaming [<FontIcon icon="fa-brands fa-x-twitter"/>documentation](https://dev.twitter.com/streaming/overview/connecting), “establishing a connection to the streaming APIs means making a very long lived HTTP request, and parsing the response incrementally. Conceptually, you can think of it as downloading an infinitely long file over HTTP.”

So, you make a request, filter it by a specific keyword, user, and/or geographic area and then leave the connection open, collecting as many tweets as possible.

This sounds complicated, but [<FontIcon icon="fas fa-globe"/>Tweepy](https://tweepy.org/) makes it easy.

---

## Tweepy Listener

Tweepy uses a “listener” to not only grab the streaming tweets, but filter them as well.

### The code

Save the following code as <FontIcon icon="fa-brands fa-python"/>`sentiment.py`:

```py :collapsed-lines title="sentiment.py"
import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from textblob import TextBlob
from elasticsearch import Elasticsearch

# import twitter keys and tokens
from config import *

# create instance of elasticsearch
es = Elasticsearch()

class TweetStreamListener(StreamListener):

    # on success
    def on_data(self, data):

        # decode json
        dict_data = json.loads(data)

        # pass tweet into TextBlob
        tweet = TextBlob(dict_data["text"])

        # output sentiment polarity
        print tweet.sentiment.polarity

        # determine if sentiment is positive, negative, or neutral
        if tweet.sentiment.polarity < 0:
            sentiment = "negative"
        elif tweet.sentiment.polarity == 0:
            sentiment = "neutral"
        else:
            sentiment = "positive"

        # output sentiment
        print sentiment

        # add text and sentiment info to elasticsearch
        es.index(index="sentiment",
                 doc_type="test-type",
                 body={"author": dict_data["user"]["screen_name"],
                       "date": dict_data["created_at"],
                       "message": dict_data["text"],
                       "polarity": tweet.sentiment.polarity,
                       "subjectivity": tweet.sentiment.subjectivity,
                       "sentiment": sentiment})
        return True

    # on failure
    def on_error(self, status):
        print status

if __name__ == '__main__':

    # create instance of the tweepy tweet stream listener
    listener = TweetStreamListener()

    # set twitter keys/tokens
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    # create instance of the tweepy stream
    stream = Stream(auth, listener)

    # search twitter for "congress" keyword
    stream.filter(track=['congress'])
```

**What’s happening?**:

1. We connect to the Twitter Streaming API;
2. Filter the data by the keyword `"congress"`;
3. Decode the results (the tweets);
4. Calculate sentiment analysis via [<FontIcon icon="fas fa-globe"/>TextBlob](https://textblob.readthedocs.org/en/dev/);
5. Determine if the overall sentiment is positive, negative, or neutral; and,
6. Finally the relevant sentiment and tweet data is added to the Elasticsearch DB.

Follow the inline comments for further details.

### TextBlob sentiment basics

To calculate the overall sentiment, we look at the [<FontIcon icon="fas fa-globe"/>polarity](http://textblob.readthedocs.org/en/latest/_modules/textblob/blob.html#BaseBlob.polarity) score:

1. Positive: From `0.01` to `1.0`
2. Neutral: `0`
3. Negative: From `-0.01` to `-1.0`

::: info

Refer to the [<FontIcon icon="fas fa-globe"/>official documentation](http://textblob.readthedocs.org/en/dev/) for more information on how TextBlob calculates sentiment.

:::

---

## Elasticsearch Analysis

Over a two hour period, as I wrote this blog post, I pulled over 9,500 tweets with the keyword “congress”. At this point go ahead and perform a search of your own, on a subject of interest to you. Once you have a sizable number of tweets, stop the script. Now you can perform some quick searches/analysis…

Using the index (`"sentiment"`) from the <FontIcon icon="fa-brands fa-python"/>`sentiment.py` script, you can use the [<FontIcon icon="iconfont icon-elasticsearch"/>Elasticsearch search API](https://elasticsearch.org/guide/en/elasticsearch/reference/current/search-search.html) to gather some basic insights.

For example:

- Full text search for “obama”: [http://localhost:9200/sentiment/_search?q=obama](http://localhost:9200/sentiment/_search?q=obama)
- Author/Twitter username search: [http://localhost:9200/sentiment/_search?q=author:allvoices](http://localhost:9200/sentiment/_search?q=author:allvoices)
- Sentiment search: [http://localhost:9200/sentiment/_search?q=sentiment:positive](http://localhost:9200/sentiment/_search?q=sentiment:positive)
- Sentiment and “obama” search: [http://localhost:9200/sentiment/_search?q=sentiment:positive&message=obama](http://localhost:9200/sentiment/_search?q=sentiment:positive&message=obama)

There’s much, *much* more you can do with Elasticsearch besides just searching and filtering results. Check out the [<FontIcon icon="iconfont icon-elasticsearch"/>Analyze API](https://elasticsearch.org/guide/en/elasticsearch/guide/current/analysis-intro.html) as well as the [<FontIcon icon="iconfont icon-elasticsearch"/>Elasticsearch - The Definitive Guide](https://elasticsearch.org/guide/en/elasticsearch/guide/current/index.html) for more ideas on how to analyze and model your data.

---

## Kibana Visualizer

[<FontIcon icon="iconfont icon-elasticsearch"/>Kibana](https://elasticsearch.org/overview/kibana/) lets “you see and interact with your data” in realtime, as you’re gathering data. Since it’s written in JavaScript, you access it directly from your browser. Check out the basics from the [<FontIcon icon="iconfont icon-elasticsearch"/>official introduction](https://elasticsearch.org/guide/en/kibana/current/_introduction.html) to quickly get started.

The pie chart at the top of this post came direct from Kibana, which shows the proportion of each sentiment - positive, neutral, and negative - to the whole from the tweets I pulled. Here’s a few more graphs from Kibana…

![Pie chart of a Twitter sentiment analysis for the word "obama"](https://files.realpython.com/media/twitter-sentiment-obama-pie-chart.6629103d5539.png)

![Table of top Twitter users by tweet count](https://files.realpython.com/media/twitter-sentiment-top-authors.86ee18e2b17a.png)

Notice how the top author as 76 tweets. That’s definitely worthy of a deeper look since that’s a lot of tweets in a two hour period. Anyway, that author basically tweeted the same tweet 76 times—so you would want to filter out 75 of these since the overall results are currently skewed.

Aside for these charts, it’s worth visualizing sentiment by location. Try this on your own. You’ll have to alter the data you are grabbing from each tweet. You may also want to try visualizing the data with a [**histogram**](/realpython.com/python-histograms.md) as well.

Finally -

1. Grab the code from the [repository (<FontIcon icon="iconfont icon-github"/>`realpython/twitter-sentiment-elasticsearch`)](https://github.com/realpython/twitter-sentiment-elasticsearch).
2. Leave comments/questions below.

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Twitter Sentiment Analysis – Python, Docker, Elasticsearch, Kibana",
  "desc": "This post details how to perform Twitter sentiment analysis using Python, Docker, Elasticsearch, and Kibana.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/twitter-sentiment-python-docker-elasticsearch-kibana.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
