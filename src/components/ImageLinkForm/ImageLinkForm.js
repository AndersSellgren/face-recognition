import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
	return (
			<div>
				<p style={{margin: '15px auto'}} className='f3 white'>
					{'This Magic Brain will detect faces in your pictures. Give it a try!'}
				</p>
				<div style={divStyle1}>
					<div style={divStyle2}>
						<input style={styleInput} type='text' />
						<button className='btn' style={styleButton}> Detect </button>
					</div>
				</div>
			</div>
		);
}

const divStyle1 = {
	display: 'flex', 
	justifyContent: 'center',
}

const divStyle2 = {
	width: '700px',
	padding: '1rem',
	margin: 'auto 10px',
	boxShadow: '5px 5px 5px 5px #111',
	border: '0px solid #aaa'
}

const styleInput = {
	width: '70%',
	padding: '0.5rem',
	fontSize: '1.5rem',
	borderRadius: '5px',
	border: '2px solid grey' 
}

const styleButton = {
	width: '30%',
	padding: '0.5rem',
	fontSize: '1.5rem',
	borderRadius: '5px',
	color: 'white',
	background: '#2C5364',
	border: '2px solid grey',
}


export default ImageLinkForm;





