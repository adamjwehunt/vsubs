var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var massive = require('massive')
var config = require('./config')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var connectionString = 'postgres://postgres:@localhost/vsubs'
// var connectionString = config.connectionString;

var app = express()
module.exports = app

var massiveInstance = massive.connectSync({connectionString: connectionString})
app.set('db', massiveInstance)

app.use(bodyParser.json())
app.use(express.static('./'))

/// Controllers///

/// Requests///

app.get('/scrape', function (req, res) {
  url = 'http://ccsubs.com/video/yt:Zir-OXs8Rfo/pregnancy-myths/subtitles'

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html)
      var title, release, rating
      var json = { title: '', release: '', rating: ''}

      $('#captions').filter(function () {
        var data = $(this)
        title = data.children().first().text()
        release = data.children().last().children().text()

        json.title = title
        json.release = release
      })

      console.log($('.yt-uix-scroller'))

      $('.star-box-giga-star').filter(function () {
        var data = $(this)
        rating = data.text()

        json.rating = rating
      })
    }

    res.send(json)
  })
})

var port = config.port
app.listen(port, function () {
  console.log('Port ' + port + ' is listening.')
})
