# Prerequisites: Needs "Needs" and Tidyverse installed

needs(tidyverse)

polls <- read_csv('data/polls.csv')

ranking <- polls %>% 
  group_by(title, artist, year, gender) %>% 
  summarise(
    points = sum(points = (6 - rank) * 2), 
    n = n(), 
    n1 = sum(rank == 1),
    n2 = sum(rank == 2),
    n3 = sum(rank == 3),
    n4 = sum(rank == 4),
    n5 = sum(rank == 5)
  ) %>% 
  arrange(
    desc(points), 
    desc(n),
    desc(n1), 
    desc(n2), 
    desc(n3), 
    desc(n4), 
    desc(n5)
  ) %>%
  rowid_to_column("ID")
  
ranking %>%
  write_csv('data/ranking.csv', na = '')

ggplot(data = ranking) +
  geom_point(mapping = aes(x = year, y = points, color = gender), position = "jitter")
