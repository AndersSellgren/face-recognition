import React from 'react';

const FaceRecognition = ({imageUrl, box}) => {

	const divStyle3 = () => ({
		position: 'absolute',
		border: '3px solid black',
		top: box.topRow,
	  left: box.leftCol,
	  bottom: box.bottomRow,
	  right: box.rightCol
	});

	return (
			<div style={divStyle1}>
				<div style={divStyle2}>
					<input type="image" id='inputImage' style={imgStyle} src={imageUrl} alt='Submit you picture!'/>
					<div style={divStyle3()}></div>
				</div>
			</div>
		);
}

const divStyle1 = {
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: '100px',
}

const divStyle2 = {
	position: 'relative',
	top: '1rem'
}

const imgStyle = {
	width: '500px',
	height: 'auto',
	boxShadow: '5px 5px 5px #111',
	// border: '3px solid #ccc'
}

export default FaceRecognition;





