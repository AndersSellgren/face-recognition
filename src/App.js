import React, { useState, useEffect, useRef } from 'react';
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
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const textInput = useRef('');

  useEffect(() => {
    // console.log(textInput.current.value)
  }, [searchField])

  const onInputChange = (event) => {
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

  const onButtonSubmit = (event) => {
    setImageUrl(searchField.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, searchField.input)
    .then(response => displayFaceBox(calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  const onRouteChange = (routeString) => {
    if (routeString === 'signout') {
      setIsSignedIn(false)
    } else if (routeString === 'home') {
      setIsSignedIn(true)
    }
    setRoute(routeString)
  }

  return (
    <div className="App">
    	{/* <Particles className='particles' params={particleOptions} /> */}
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} /> 
        { route === 'home' ?  
          <div>
            <Logo /> 
            <Rank />
            <ImageLinkForm textInput={textInput} onButtonSubmit={onButtonSubmit} 
            onInputChange={onInputChange} searchField={searchField}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :
          route === 'signin' || route === 'signout' ? <SignIn onRouteChange={onRouteChange}/>
          : <Register onRouteChange={onRouteChange}/>
        }
    </div>
  );
}

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





