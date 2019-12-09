install.packages("tidyverse")
library(tidyverse)

polls <- read.csv('data/bbc_hiphop_25.csv')
polls <- mutate(polls, points = (6 - rank) * 2)
by_song <- group_by(polls, artist, title, year, artist_gender)
ranking <- summarise(by_song, points_total = sum(points), n = n())

View(ranking)

ggplot(data = ranking) + 
  geom_point(mapping = aes(x = year, y = points_total, color = artist_gender), position = "jitter")
