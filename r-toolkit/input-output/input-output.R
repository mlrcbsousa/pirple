setwd('/home/manuel/code/mlrcbsousa/pirple/r-toolkit/input-output')

# Internet Users by Country
users <- read.csv('List of Countries by number of Internet Users - Sheet1.csv')

View(users)

# Kaggle Datasets
kaggle <- read.csv('Kaggle Datasets.csv')

# Online Shoppers Intentions
shoppers <- read.csv('online_shoppers_intention.csv')

# Export as RData
save(users, file = "exported_internet_users.RData")

# Load RData
load("exported_internet_users.RData")