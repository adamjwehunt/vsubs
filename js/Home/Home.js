import React from 'react'
import './Home.css'

const Home = React.createClass({
  render () {
    return (
      <div className='home-wrap'>
        <div className='welcome'>
          <div className='welcome-logo'>
            <h1>
              <span className='vee'>v</span>
              <span className='subs'>subs</span>
            </h1>
          </div>
          <div className='welcome-message'>
            <h2>Interactive Transcripts for Youtube
            </h2>
            <h3>Get started by entering a video URL up top.
              Need help? go ahead and paste this cat video in:
            </h3>
            <h3>https://www.youtube.com/watch?v=9h_QtLol75I
            </h3>
            <h5>Note: Vsubs only supports videos with user-submitted subtitles, auto-generated subtitles are coming soon!
            </h5>
          </div>
        </div>
      </div>
    )
  }
})

export default Home
