import React, { useState,useEffect } from 'react';

const SignIn = ({onRouteChange, setUser}) => {

  	const [email, setEmail] = useState('')
  	const [password, setPassword] = useState('')
  	
  	const onChangeEmail = (event) => {
  		setEmail(event.target.value)
  	}

  	const onChangePassword = (event) => {
  		setPassword(event.target.value)
  	}

  	useEffect(() => {
	  	document.addEventListener('keypress', (event) => {
	  		if(event.key === 'Enter') {
	  			console.log(event.key)
	  		}
	  	})
	}, [])

	const onSubmitSignIn = async () => {
		const response = await fetch('https://floating-gorge-55661.herokuapp.com/signin',
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(
					{
						email: email,
						password: password
					}
				)
			}
		)
		const data =  await response.json()

		if (data.id) {
			setUser(data)
			onRouteChange('home')
		} else {
			console.log('Invalid user credentials')
		}		 
	}

	return (
			<div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l center">
				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 w-100">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="email" name="email-address"  id="email-address" onChange={onChangeEmail}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="password" name="password" id="password" onChange={onChangePassword}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      onClick={onSubmitSignIn}
				      id='button'
				      className="b br3 ph3 pv2 input-reset ba b--black-90 bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')}  className="b f6 link dim black db pointer underline">Register account</p>
				    </div>
				  </div>
				</main>
			</div>
		);
}

export default SignIn;





