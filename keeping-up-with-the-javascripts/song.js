/*
  First Homework Assignment for the Pirple course Keeping Up with the Javascripts

  - Listing a song's characteristics using different Data types
*/

var songName = "Dance Monkey";
var artistName = "Tones and I";
var durationInSeconds = 237;
var genre = "Dance Pop";

var links = {
  // URL objects makes more sense then strings
  artist: new URL("https://www.tonesandi.com"),
  mailingList: new URL("https://bit.ly/2tL6gAW"),
  single: new URL("https://tonesandi.lnk.to/TheKidsAreComingYT"),
  album: new URL("https://tonesandi.lnk.to/DanceMonkeyYT"),
};

var management = {
  name: "Lemon Tree Music",
  email: "mgmt@tonesandi.com",
};

var followLinks = {
  facebook: new URL("https://www.facebook.com/TONESANDI"),
  instagram: new URL("https://www.instagram.com/tonesandi"),
};

var single = true;
var albumName = "The Kids Are Coming";

var musicVideo = {
  // Went for array when list of people
  directors: ["Liam Kelly", "Nick Kozakis"],
  directorPhotography: "Carl Allison",
  makeup: "Danielle Ruth",
  producer: "Visible Studios",
  producerLink: new URL("https://www.visiblestudios.com.au/"),
};

var youtube = {
  views: 853701861,
  subscribers: 2830000,
  likes: 8200000,
  dislikes: 374000,
  comments: 196598,
  channelLink: new URL ("http://smarturl.it/TonesAndI.YT"),
  // Date object made more sense then a string
  publishedDate: new Date('25 Jun 2019'),
  highestRatedComment: {
    likes: 12000,
    body: `
      Song : Move for me, Move for me, Move for me.


      Me : mufami mufami mufami.
    `,
    repliesCount: 288,
    // Date on the youtube video says 5 months ago
    postedDate: function () {
      var date = new Date('3 Apr 2020');
      date.setMonth(date.getMonth() - 5);
      return date;
    },
  },
};

// Found interpolating string syntax works with newlines and apostrophies
var lyrics = `
  They say oh my god I see the way you shine
  Take your hands my dear and place them both in mine
  You know you stopped me dead while I was passing by
  And now I beg to see you dance just one more time
  Ohhh I
  See you see you seen you every time
  and oh my I, I like you style
  You, you make me make me make me wanna cry
  And now I beg to see you dance just one more time

  So they say
  Dance for me
  Dance for me
  Dance for me
  Oh oh oh
  I’ve never seen anybody do the things you do before
  They say
  Move for me
  Move for me
  Move for me
  Eh eh eh
  And when you’re done i'll make you do it all again

  I said
  Oh my god I see you walking by
  Take my hands my dear and look me in my eyes
  Just like a monkey I’ve been dancing my whole life
  But you just beg to see me dance just one more time
  Ooh I
  See you see you seen you every time
  And oh my I, I like your style
  You, you make me make me make me wanna cry
  And now I beg to see you dance just one more time

  So they say
  Dance for me
  Dance for me
  Dance for me
  Oh oh oh
  I’ve never seen anybody do the things you do before
  They say
  Move for me
  Move for me
  Move for me
  Eh eh eh
  And when you’re done i'll make you do it all again
  They say
  Dance for me
  Dance for me
  Dance for me
  Oh oh oh, oh oh oh oh
  I’ve never seen anybody do the things you do before
  They say
  Move for me
  Move for me
  Move for me
  Eh eh eh
  And when you’re done i'll make you do it all again

  Oooooo

  They say
  Dance for me
  Dance for me
  Dance for me
  Oh oh oh
  I’ve never seen anybody do the things you do before
  They say
  Move for me
  Move for me
  Move for me
  Eh eh eh
  And when you’re done i'll make you do it all again
  They say
  Dance for me
  Dance for me
  Dance for me
  Oh oh oh, oh oh oh oh
  I’ve never seen anybody do the things you do before
  They say
  Move for me
  Move for me
  Move for me
  Eh eh eh
  And when you’re done i'll make you do it all again
  All again
`

console.log(songName)
console.log(artistName)
console.log(durationInSeconds)
console.log(genre)
console.log(links.artist)
console.log(links.mailingList)
console.log(links.single)
console.log(links.album)
console.log(management.name)
console.log(management.email)
console.log(followLinks.facebook)
console.log(followLinks.instagram)
console.log(single)
console.log(albumName)
console.log(musicVideo.directors)
console.log(musicVideo.directorPhotography)
console.log(musicVideo.makeup)
console.log(musicVideo.producer)
console.log(musicVideo.producerLink)
console.log(youtube.views)
console.log(youtube.subscribers)
console.log(youtube.likes)
console.log(youtube.dislikes)
console.log(youtube.comments)
console.log(youtube.channelLink)
console.log(youtube.publishedDate)
console.log(youtube.highestRatedComment.likes)
console.log(youtube.highestRatedComment.body)
console.log(youtube.highestRatedComment.repliesCount)
console.log(youtube.highestRatedComment.postedDate())
console.log(lyrics)
