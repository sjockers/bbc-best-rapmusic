# Prerequisites: Needs "Needs", Tidyverse and Devtools installed
# ==============================================================
# install.packages("devtools")
# devtools::install_github("munichrocker/DatawRappr")

needs(tidyverse, DatawRappr)

ranking <- read_csv('data/ranking.csv')

# Create chart using the Datawrapper API:
# https://blog.datawrapper.de/new-api-Datawrapper-chart-creation-automation/
datawrapper_auth(api_key = readRenviron(DATAWRAPPER_API_KEY))
dw_chart <- dw_create_chart(title = "BBC Best Hip-Hop Songs of All Time", type = "d3-scatter-plot")
dw_data_to_chart(ranking, dw_chart[["id"]])

View(dw_chart)