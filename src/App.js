import React, { useState, useRef } from 'react';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// import Particles from 'react-particles-js';
import './App.css';

// Require the client
  const Clarifai = require('clarifai');

  // initialize with your api key. This will also work in your browser via http://browserify.org/
  const app = new Clarifai.App({
   apiKey: '8e2fb7bcebec4ef59a3fcebb50711b2c'
  });


function App() {

  const [searchField, setSearchField] = useState({input: ''});
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInLink, setShowSignInLink] = useState(false);
  const [user, setUser] = useState({});

  const textInput = useRef('');
  

  const onInputChange = (event) => {
    event.preventDefault()
    // setSearchField(textInput.current.value)
    setSearchField({input: event.target.value})
  }

  const calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    // console.log(clarifyFace);
    return {
      topRow: clarifyFace.top_row * height,
      leftCol: clarifyFace.left_col * width,
      bottomRow: height - (clarifyFace.bottom_row * height),
      rightCol: width - (clarifyFace.right_col * width)
    }
  }

  const displayFaceBox = (borders) => {
    setBox(borders);
  }

  const onPictureSubmit = (event) => {
    event.preventDefault();
    setImageUrl(searchField.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, searchField.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', 
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: user.id})
          }
        ).then(response => response.json())
        .then(data => setUser(prevState => {return { ...prevState, entries: data}}))

        displayFaceBox(calculateFaceLocation(response))
      }
    })
    .catch(err => console.log(err))
    console.log(user)
  }

  // Change to switch!
  const onRouteChange = (routeString) => {
    if (routeString === 'signout') {
      setIsSignedIn(false)
      setShowSignInLink(false)
    } else if (routeString === 'home') {
      setIsSignedIn(true)
    } else if (routeString === 'register') {
      setShowSignInLink(true)
    } else if (routeString === 'signin') {
      setShowSignInLink(false)
    }   
    
    setRoute(routeString)
  }

  return (
    <div className="App">
    	{/* <Particles className='particles' params={particleOptions} /> */}
      <Navigation isSignedIn={isSignedIn} showSignInLink={showSignInLink}
      onRouteChange={onRouteChange} /> 
        { route === 'home' ?  
          <div>
            <Logo /> 
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm textInput={textInput} onPictureSubmit={onPictureSubmit} 
            onInputChange={onInputChange} searchField={searchField}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :
          route === 'signin' || route === 'signout' ? 
          <SignIn onRouteChange={onRouteChange}/> :
           <Register setUser={setUser} onRouteChange={onRouteChange}/>
        }
    </div>
  );
}

// Particles is a very CPU demanding application
// const particleOptions = {
// 	particles: {
// 		number: {
// 			value: 100,
// 			density: {
// 				enable: true,
// 				value_area: 800
// 			}
// 		}
// 	}
// }

export default App;





