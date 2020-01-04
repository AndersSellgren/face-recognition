import React from 'react';

const Rank = () => {
	return (
			<div style={divStyle}>
				<div className='tc white f3'>
					{'Selle, your current rank is....'}
				</div>
				<div className='tc white f1'>
					{'#5'}
				</div>
			</div>
		);
}

const divStyle = {
	marginTop: '20px',
	display: 'flex',
	flexDirection: 'column',
	jusifyContent: 'center',
	alignItems: 'center',
	flexGrow: 100
}

export default Rank;





