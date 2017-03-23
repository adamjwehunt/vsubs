import axios from 'axios'

export function scraper () {
  axios.get('/scrape').then(res => console.log(res))
  console.log('test')
}
