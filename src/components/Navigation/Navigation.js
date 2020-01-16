import React from 'react'
// import Logo from '../Logo/Logo'
// import Rank from '../Rank/Rank'

const Navigation = ({onRouteChange,isSignedIn,showSignInLink}) => {
	if (isSignedIn){
		return (
		<nav style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
			<p onClick={() => onRouteChange('signout')} style={{margin:'20px'}} 
			className='f3 link dim black underline pointer'> Sign Out </p>
		</nav>
		);
	} else {
		if (showSignInLink) {
			return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
				<p onClick={() => onRouteChange('signin')} style={{margin:'20px'}} 
				className='f3 link dim black underline pointer'> Sign In </p>
			</nav>
			)
		} else {
			return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
				<p onClick={() => onRouteChange('register')} style={{margin:'20px'}} 
					className='f3 link dim black underline pointer'> Register </p>
			</nav>
			)
		}
	}
};

export default Navigation;