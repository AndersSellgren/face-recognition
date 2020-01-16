import React, { useRef } from 'react';

const SignIn = ({onRouteChange}) => {

	// const [users, setUsers] = useState({})
	const email = useRef('');
  	const password = useRef('');

	// useEffect(() => {
 //    	fetch('http://localhost:3000/')
 //    	.then(res => res.json())
 //    	.then(users => setUsers(users))
 //  	}, [])

	const onSubmitSignIn = async () => {
		const response = await fetch('http://localhost:3000/signin',
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(
					{
						email: email.current.value,
						password: password.current.value
					}
				)
			}
		)
		const data =  await response.json()
		console.log(data)
		if (data === 'Login Success!') {
			onRouteChange('home')
		} else {
			console.log('Wrong password')
		}		 
	}

	return (
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l center">
				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 w-100">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="email" name="email-address"  id="email-address" ref={email}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-moon-gray hover-black w-100" 
				        type="password" name="password"  id="password" ref={password}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      onClick={onSubmitSignIn} 
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
			</article>
		);
}

export default SignIn;





