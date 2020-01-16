import React from 'react';

const Rank = ({name, entries}) => {
	return (
			<div style={divStyle}>
				<div className='tc white f3'>
					{`${name}, your current rank is....`}
				</div>
				<div className='tc white f1 pa3'>
					{entries}
				</div>
			</div>
		);
}

const divStyle = {
	alignText: 'center',
	marginTop: '20px',
	display: 'flex',
	flexDirection: 'column',
	jusifyContent: 'center',
	alignItems: 'center',
	flexGrow: 100
}

export default Rank;





