import React, { Component } from 'react';
import Button from  '../../components/Button/Button';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import Sort from '../../components/Sort/Sort';

const SORTS = {
	NONE: list => list,
	TITLE: list => sortBy(list, 'title'),
	AUTHOR: list => sortBy(list, 'author'),
	COMMENTS: list => sortBy(list, 'num_comments').reverse(),
	POINTS: list => sortBy(list, 'points').reverse(),
};


class Table extends Component { 

	constructor(){
		super();
		
		this.state = {
			sortKey: 'NONE',
			isSortReverse: false,
		};
	}
		
	onSort = (sortKey) => {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({ sortKey, isSortReverse });
  
	}

	render(){

		const { list, onDismiss } = this.props;
			
		const { sortKey, isSortReverse } = this.state;

		const sortedList = SORTS[sortKey](list);
		const reverseSortedList = isSortReverse
			? sortedList.reverse()
			: sortedList;

	return(
			<div className='table'>
				<div className='table-header'>
					<span style={{midColumn}}>
						<Sort 
							sortKey={'TITLE'}
							onSort={this.onSort}
							activeSortKey={sortKey}
						>
							Title
						</Sort>
					</span>
					<span style={{midColumn}}>
						<Sort 
							sortKey={'AUTHOR'}
							onSort={this.onSort}
							activeSortKey={sortKey}
						>
							Author
						</Sort>
					</span>
					<span style={{smallColumn}}>
						<Sort 
							sortKey={'POINTS'}
							onSort={this.onSort}
							activeSortKey={sortKey}
						>
							Points
						</Sort>
					</span>
					<span style={{midColumn}}>
						<Sort 
							sortKey={'COMMENTS'}
							onSort={this.onSort}
							activeSortKey={sortKey}
						>
							Comments
						</Sort>
					</span>
					<span style={{smallColumn}}>
						Archive
					</span>
				</div>
				{reverseSortedList.map(item =>
						<div key={item.objectsID} className='table-row'><br />
							<span style={midColumn}>
								<h3>Book:</h3> <a href={item.url}>{item.title}</a>
							</span><br />
							<span style={midColumn}> <h3>Author:</h3> { item.author}</span><br />
							<span style={smallColumn}> <h3>points:</h3> { item.points}</span><br />
							<span style={midColumn}> <h3>No. of Comments:</h3> { item.num_comments}</span><br />
							{/* <span style={smallColumn}> <h3>Id:</h3> { item.objectsID}</span><br /> */}
							<Button 
								style={smallColumn}
								onClick={() => onDismiss(item.objectsID)}
								className='button-inline'
							>
								Dismiss
							</Button>
						</div>
					)
				}
		</div>
		)
	}
	
}

Table.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			//objectsID: PropTypes.string.isRequired,
			author: PropTypes.string,
			url: PropTypes.string,
			num_comments: PropTypes.number,
			points: PropTypes.number,
		})
	).isRequired,
	onDismiss: PropTypes.func.isRequired,
}

// const largeColumn = {
// 	width: '40%',
// };

const midColumn = {
	width: '30%',
};

const smallColumn = {
	width: '10%',
};


export default Table;