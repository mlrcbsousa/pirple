#
#  First Homework Assignment for the Pirple course The R Toolkit
#
#  - Listing a song's characteristics using different Variable types
#

songName <- "Dance Monkey"
artistName <- "Tones and I"
durationInSeconds <- 237
genre <- "Dance Pop"

# Is the song published as a single?
single <- T

artistLink <- "https://www.tonesandi.com"
mailingListLink <- "https://bit.ly/2tL6gAW"
singleLink <- "https://tonesandi.lnk.to/TheKidsAreComingYT"
albumLink <- "https://tonesandi.lnk.to/DanceMonkeyYT"

managementName <- "Lemon Tree Music"
managementEmail <- "mgmt@tonesandi.com"

facebook <- "https://www.facebook.com/TONESANDI"
instagram <- "https://www.instagram.com/tonesandi"

albumName <- "The Kids Are Coming"

musicVideoDirectorPhotography <- "Carl Allison"
musicVideoMakeup <- "Danielle Ruth"
musicVideoProducer <- "Visible Studios"
musicVideoProducerLink <- "https://www.visiblestudios.com.au/"

youtubeViews <- 853701861
youtubeSubscribers <- 2830000
youtubeLikes <- 8200000
youtubeDislikes <- 374000
youtubeComments <- 196598
youtubeHighestRatedCommentLikes <- 12000

youtubeChannelLink <- "http://smarturl.it/TonesAndI.YT"
youtubePublishedDate <- '25 Jun 2019'

# Vector of the different youtube metrics
youtubeNumbersValues <- c(
  youtubeViews,
  youtubeSubscribers,
  youtubeLikes,
  youtubeDislikes,
  youtubeComments
)

youtubeNumbersHeadings <- c(
  "youtubeViews",
  "youtubeSubscribers",
  "youtubeLikes",
  "youtubeDislikes",
  "youtubeComments"
)

# Data frame of Headings and Values of youtube metrics
youtubeNumbers <- data.frame(youtubeNumbersHeadings, youtubeNumbersValues)

# Some vector operations on the different youtube metrics
youtubeNumbersInThousands <- youtubeNumbersValues / 1000
youtubeNumbersInMillions <- youtubeNumbersInThousands / 1000
areGreaterThenOneMillion <- youtubeNumbersInMillions >= 1

# Which of the youtube metrics are greater then one million as a vector
youtubeNumbersInMillionsGreaterThenOneMillionVector <- youtubeNumbersInMillions[areGreaterThenOneMillion]

# Which of the youtube metrics are greater then one million as a data frame of the headings
youtubeNumbersInMillionsGreaterThenOneMillionHeadings <- youtubeNumbers[youtubeNumbers$youtubeNumbersValues >= 1000000,][c(1)]

youtubeHighestRatedCommentBody <- "\n\
  Song : Move for me, Move for me, Move for me.\n\
  \n\
  Me : mufami mufami mufami.\n\
"
youtubeHighestRatedCommentRepliesCount <- 288

# List item of the lines in the lyrics
lyrics <- list(
  "\n",
  "They say oh my god I see the way you shine\n",
  "Take your hands my dear and place them both in mine\n",
  "You know you stopped me dead while I was passing by\n",
  "And now I beg to see you dance just one more time\n",
  "Ohhh I\n",
  "See you see you seen you every time\n",
  "and oh my I, I like you style\n",
  "You, you make me make me make me wanna cry\n",
  "And now I beg to see you dance just one more time\n",
  "\n",
  "So they say\n",
  "Dance for me\n",
  "Dance for me\n",
  "Dance for me\n",
  "Oh oh oh\n",
  "I’ve never seen anybody do the things you do before\n",
  "They say\n",
  "Move for me\n",
  "Move for me\n",
  "Move for me\n",
  "Eh eh eh\n",
  "And when you’re done i'll make you do it all again\n",
  "\n",
  "I said\n",
  "Oh my god I see you walking by\n",
  "Take my hands my dear and look me in my eyes\n",
  "Just like a monkey I’ve been dancing my whole life\n",
  "But you just beg to see me dance just one more time\n",
  "Ooh I\n",
  "See you see you seen you every time\n",
  "And oh my I, I like your style\n",
  "You, you make me make me make me wanna cry\n",
  "And now I beg to see you dance just one more time\n",
  "\n",
  "So they say\n",
  "Dance for me\n",
  "Dance for me\n",
  "Dance for me\n",
  "Oh oh oh\n",
  "I’ve never seen anybody do the things you do before\n",
  "They say\n",
  "Move for me\n",
  "Move for me\n",
  "Move for me\n",
  "Eh eh eh\n",
  "And when you’re done i'll make you do it all again\n",
  "They say\n",
  "Dance for me\n",
  "Dance for me\n",
  "Dance for me\n",
  "Oh oh oh, oh oh oh oh\n",
  "I’ve never seen anybody do the things you do before\n",
  "They say\n",
  "Move for me\n",
  "Move for me\n",
  "Move for me\n",
  "Eh eh eh\n",
  "And when you’re done i'll make you do it all again\n",
  "\n",
  "Oooooo\n",
  "\n",
  "They say\n",
  "Dance for me\n",
  "Dance for me\n",
  "Dance for me\n",
  "Oh oh oh\n",
  "I’ve never seen anybody do the things you do before\n",
  "They say\n",
  "Move for me\n",
  "Move for me\n",
  "Move for me\n",
  "Eh eh eh\n",
  "And when you’re done i'll make you do it all again\n",
  "They say\n",
  "Dance for me\n",
  "Dance for me\n",
  "Dance for me\n",
  "Oh oh oh, oh oh oh oh\n",
  "I’ve never seen anybody do the things you do before\n",
  "They say\n",
  "Move for me\n",
  "Move for me\n",
  "Move for me\n",
  "Eh eh eh\n",
  "And when you’re done i'll make you do it all again\n",
  "All again\n"
)
