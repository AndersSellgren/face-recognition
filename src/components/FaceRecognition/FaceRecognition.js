import React from 'react';

const FaceRecognition = ({imageUrl}) => {

	return (
			<div style={divStyle}>
				<img src={imageUrl} alt='Submit you picture here'/>
			</div>
		);
}

const divStyle = {
	margin: '15px',
}

export default FaceRecognition;





