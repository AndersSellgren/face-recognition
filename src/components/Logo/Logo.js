import React from 'react'
import Tilt from 'react-tilt'
// import brain from './brain.png';

const Logo = () => {
	return (
		<Tilt className="Tilt" options={optionTilt} style={styleTilt} >
			<div className="Tilt-inner">
				<img style={styleImg} src={require('./brain.png')} alt="Brain"/> 
			</div>
		</Tilt>
	);
}

const styleImg = {
	width: '90%',
  height: '90%',
  cursor: 'pointer'
}

const styleTilt = {
	marginLeft: 20,
	marginTop: 20, 
	height: 100, 
	width: 100,
	color: 'black', 
	background: 'linear-gradient(to right,#0F2027,#203A43,#2C5364)',
	borderRadius: 10,
	// textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	// lineHeight: 250,
	
	}

const optionTilt = {
    reverse:        false,  // reverse the tilt direction
    max:            45,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:          300,    // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true    // If the tilt effect has to be reset on exit.
}

export default Logo;