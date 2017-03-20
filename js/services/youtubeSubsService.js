import axios from 'axios'
import { parseString } from 'xml2js'

export function getYoutubeSubs (videoid) {
  return axios.get(`http://video.google.com/timedtext?lang=en&v=${videoid}`).then((res) => {
    var parsedSubs

    function htmlDecode (s) {
      var el = document.createElement('div')
      el.innerHTML = s
      return el.innerText || el.textContent
    }

    parseString(res.data, {
      charkey: 'subtitle',
      mergeAttrs: true
    }, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        result.transcript.text.map((x) => { x.subtitle = htmlDecode(x.subtitle) })
        parsedSubs = result
      }
    })

    return parsedSubs
  })
}
