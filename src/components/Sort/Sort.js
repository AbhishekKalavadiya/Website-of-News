import React from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';

const Sort = ({ sortKey, onSort, children, activeSortKey }) =>{ 

	const sortClass = classNames(
		'button-inline',
		{ 'button-active': sortKey === activeSortKey }
	); 

	return(
		<Button 
			onClick={()=>onSort(sortKey)} 
			className={sortClass}
		> 
			{children}
		</Button>	

	)
	
}

export default Sort;