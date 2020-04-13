DurationInSeconds = 240

SongName1 = "Dance"
SongName2 = "Monkey"

ArtistName1 = "Tones"
ArtistName2 = "and"
ArtistName3 = "I"

def single():
  return False

def joinNames(*Names):
  return " ".join(Names)

def durationInMinutes(DurationInSeconds):
  return DurationInSeconds / 60

SongName = joinNames(SongName1, SongName2)
ArtistName = joinNames(ArtistName1, ArtistName2, ArtistName3)
SongIsSingle = single()

print(SongName)
print(ArtistName)
print(SongIsSingle)