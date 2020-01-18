import React, { useState, useRef } from 'react';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// import ParticlesBackground from './ParticlesBackground'
import './App.css';

// Unnecessary
const initialUser = 
  {
    id: 0,
    name: '',
    email: '',
    entries: '',
    joined: '' 
  };

function App() {
        
  const [user, setUser] = useState(initialUser);
  const [searchField, setSearchField] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInLink, setShowSignInLink] = useState(false);
  
  const textInput = useRef('');

  const onInputChange = (event) => {
    event.preventDefault()
    setSearchField(textInput.current.value)
    // setSearchField(event.targert.value)
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
    setImageUrl(searchField);
    
    fetch('http://localhost:3000/imageurl', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: searchField })
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', 
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: user.id })
          }
        ).then(response => response.json())
        .then(data => setUser({ ...user, entries: data}))
        // .then(data => setUser(prevState => ({ ...prevState, entries: data})))
        .catch(console.log)

        displayFaceBox(calculateFaceLocation(response))
      }
    })
    .catch(err => console.log(err))
  }

  // Change to switch!
  const onRouteChange = (routeString) => {
    switch(routeString) {
      case 'signout':
        setIsSignedIn(false)
        setShowSignInLink(false)
        setUser(initialUser)
        setImageUrl(null);
        setSearchField('');
        console.log(user)
        break;
      case 'home':
        setIsSignedIn(true)
        break;
      case 'register':
        setShowSignInLink(true)
        break;
      case 'signin':
        setShowSignInLink(false)
        break;
      default:
        console.log('ERROR')
    }

    setRoute(routeString)
  }

  return (
    <div className="App">
    	{/* <ParticlesBackground/> */}
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
          <SignIn setUser={setUser} onRouteChange={onRouteChange}/> :
          <Register setUser={setUser} onRouteChange={onRouteChange}/>
        }
    </div>
  );
}

export default App;





