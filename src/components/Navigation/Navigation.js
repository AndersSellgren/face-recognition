import React from 'react'
import Logo from '../Logo/Logo'
import Rank from '../Rank/Rank'

const Navigation = () => {
	return (
		<nav style={{display: 'flex', justifyContent: 'flex-start', margin: '10px'}}>
			<Logo />
			<Rank />
			<p style={{display: 'flex', justifyContent: 'flex-end'}} className='f3 link dim black underline pa4 ma0 pointer'> Sign Out </p>
		</nav>
	);
}

export default Navigation;