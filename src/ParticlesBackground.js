import React, { PureComponent } from 'react';
import Particles from 'react-particles-js';
 
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
}
 
class ParticlesBackground extends PureComponent {
  render() {
    return(
        <Particles className='particles' 
        params={particlesOptions} />
    )
  }
}
 
export default ParticlesBackground;