import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation/Navigation'
// import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
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
  const textInput = useRef();

  useEffect(() => {
    // console.log(searchField.input) 
  }, [searchField])

  const onInputChange = (event) => {
    // console.log(textInput.current.value)
    setSearchField({input: event.target.value})
  }

  const onButtonSubmit = (event) => {
    setImageUrl(searchField.input);
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', imageUrl)
    .then(function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  return (
    <div className="App">
    	{/* <Particles className='particles' params={particleOptions} /> */} 
      <Navigation />
      {/*<Logo /> 
      <Rank />*/} 
      <ImageLinkForm textInput={textInput} onButtonSubmit={onButtonSubmit} 
      onInputChange={onInputChange} searchField={searchField}/>
      <FaceRecognition imageUrl={imageUrl}/>
    </div>
  );
}

const particleOptions = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

export default App;





