import React from 'react';
import videobg from '../assets/videobg.mp4'
import '../Style/Home.scss'
class Home extends React.Component {
  render() {
    return (
      <div className='bgContainer'style={{}} >
        <div className='overlay' style={{overflow:'hidden'}}>
            <video src={videobg} autoPlay loop muted />
        </div>
       
      </div>
    );
  }
}
export default Home
