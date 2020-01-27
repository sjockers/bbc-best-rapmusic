## The best hip-hop songs of all time, visualized

A tiny data analysis project on hip-hop & gender, based on data from [BBC Music](http://www.bbc.com/culture/story/20191007-the-greatest-hip-hop-songs-of-all-time-who-voted). See my post on the Datawrapper blog for more info: [The best hip-hop songs of all time, visualized](https://blog.datawrapper.de/best-hip-hop-songs-of-all-time-visualized/). 

This is a educational project and not affiliated with BBC Music.

---

![](https://img.datawrapper.de/0Ukgy/plain.png)

[[Interactive chart]](https://www.datawrapper.de/_/0Ukgy/)

### Background

BBC Music polled over 100<sup id="a1">[1](#f1)</sup> critics in 15 countries to find [the best hip-hop song ever](http://www.bbc.com/culture/story/20191007-the-greatest-hip-hop-songs-of-all-time). This repo contains poll data, originally published by BBC Music, as well as code for transforming the data, adding cover artwork, and publishing charts via Datawrapper. The poll data was extracted from this article on bbc.com: [The greatest hip-hop songs of all time - who voted](http://www.bbc.com/culture/story/20191007-the-greatest-hip-hop-songs-of-all-time-who-voted)

### Data

- [Complete ranking](https://github.com/sjockers/bbc-best-rapmusic/blob/master/data/ranking.csv) (310 songs, ranked by critic rating)
- [Complete poll data](https://github.com/sjockers/bbc-best-rapmusic/blob/master/data/polls.csv) (535 entries by 107 critics and music industry folks)

### Ranking the poll submissions (using R)

The ranking algorithm, as described in the [BBC Music article](http://www.bbc.com/culture/story/20191007-the-greatest-hip-hop-songs-of-all-time-who-voted):

> We awarded 10 points for first ranked track, eight points for second ranked track, and so on down to two points for fifth place. The song with the most points won. We split ties by the total number of votes: songs with more votes ranked higher. Any ties remaining after this were split by first place votes, followed by second place votes and so on: songs with more critics placing them at higher up the lists up ranked higher.

Use [`run_analysis.R`](https://github.com/sjockers/bbc-best-rapmusic/blob/master/run_analysis.R) to run this algothm using R.

### Publish charts to Datawrapper (using R)

See [`create_datawrapper_chart.R`](https://github.com/sjockers/bbc-best-rapmusic/blob/master/create_datawrapper_chart.R) for a simple script that creates a scatterplot using Datawrapper. This script uses the experimental [DatawRappr R package](https://blog.datawrapper.de/why-i-created-an-R-library-to-use-Datawrappers-API/), which needs to be installed via Devtools (`devtools::install_github("munichrocker/DatawRappr")`). You'll need a Datawrapper API key, which you can obtain from https://app.datawrapper.de/account/api-tokens and then set in an `.Renviron` file. See `.Renviron.sample` for an example.

### Get album covers from the Spotify API (using NodeJS)

```sh
npm install
node load_spotify_data.js --token='YOUR-OAUTH-TOKEN'  
```

For using the Spotify API, you need to generate an oAuth token on developer.spotify.com. Docs and a simple way to generate a token can be found here: https://developer.spotify.com/console/get-search-item.

---

#### Footnotes

<b id="f1">1</b> The list published by BBC Music has 107 entries. However, other articles about the best of list give the number of critics polled as [106](http://www.bbc.com/culture/story/20191016-the-greatest-hip-hop-songs-from-around-the-world) and [108](http://www.bbc.com/culture/story/20191007-the-greatest-hip-hop-songs-of-all-time-who-voted). [↩](#a1)
