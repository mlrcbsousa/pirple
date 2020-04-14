# Data Input and Output

## Importing
setwd('/home/manuel/code/mlrcbsousa/pirple/r-toolkit')
library(xlsx)

# CSV
ds <- read.csv("MOCK_DATA.csv")

# View data (sidenote)
ls() # list variables in the curretn environment
View(ds) # same as clicking on the right side Global Environments tab

# Excel
ds2 <- read.xlsx("MOCK_DATA.xlsx", sheetIndex = 1)

# RData
# save(dsRData, file = "MOCK_DATA.RData")
load("MOCK_DATA.RData")

# Tab delimited
ds3 <- read.csv("MOCK_DATA.txt", sep = "\t")

# scraping web data
library(rvest)
library(dplyr)
url <- "https://www.hockey-reference.com/teams/index.html"
nhl.ref <- read_html(url)
  nhl.ds <- nhl.ref %>%
  html_nodes(xpath = '//*[@id="active_franchises"]') %>%
  html_table(fill = T)
nhl.teams <- nhl.ds[[1]]

# Sourcing R code
source("stocks_functions.R")

## Output Data
# CSV
write.csv(ds, file = "wrtten_mock_data.csv")

# Text
write.table(ds, file = "written_mock_data.txt", sep = "\t")

# RData
save(ds, file = "written_mock_data.RData")

# R image
save.image(file = "written_mock_data.RData") # multiple data frames
load()