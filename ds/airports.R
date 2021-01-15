# set working directory
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# load dependencies
library(sp)
library(rgeos)

# load OurAirports global airports dataset
df <- read.csv("data/airports/sources/airports_oa.csv", encoding="UTF-8", stringsAsFactors=F)
colnames(df)[c(5:6)] <- c("lat", "long")

# append unique identifier
df$id <- seq(0, nrow(df) - 1)

# assign sentinel value to null elevations
df$elevation_ft[is.na(df$elevation_ft)] <- -99

# remove trailing apostrophes so SQL-friendly strings can be used
df$municipality[11313] <- "Al Bayda"
df$keywords[51259] <- "Paterno"
df$municipality[52709] <- "Saranpaul"

# store columns with string values
stringCols = c(2:4, 8:11, 13:18, 20)

# clean string values so SQL-friendly strings can be used
df[,stringCols] <- data.frame(lapply(df[,stringCols], gsub, pattern="\"", replacement=""), stringsAsFactors=F)
df[,stringCols] <- data.frame(lapply(df[,stringCols], gsub, pattern=",", replacement=" |"), stringsAsFactors=F)

# save wrangled dataset
write.csv(df, "data/airports/airports.csv", fileEncoding="UTF-8", row.names=F)
