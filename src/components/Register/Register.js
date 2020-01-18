import React, { useState } from 'react';

const Register = ({setUser, onRouteChange}) => {

	const [name, setName] = useState('');
  	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');

  	const onChangeName = (event) => {
  		setName(event.target.value)
  	}

  	const onChangeEmail = (event) => {
  		setEmail(event.target.value)
  	}

  	const onChangePassword = (event) => {
  		setPassword(event.target.value)
  	}

   const onSubmit = () => {
		fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			})
		}).then(response => response.json())
	     .then(data => {
	     		console.log(data)
	     		console.log(data.email)
				if (data.id) {
					setUser(data)
					onRouteChange('home')
				}
			})
  		.catch(error => console.log(error))
  }

	return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l center">
				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 w-100">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="text" name="name"  id="name" onChange={onChangeName} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="email" name="email-address"  id="email-address" onChange={onChangeEmail}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="password" name="password"  id="password" onChange={onChangePassword}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      onClick={onSubmit} 
				      className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Submit"
				      />
				    </div>
				  </div>
				</main>
			</article>
		);
}

export default Register;





