import React, { Component } from 'react';


class Search extends Component { 

	componentDidMount(){
		if (this.input) {
			this.input.focus();
		}
	}
			
	
	render() {
		const {
			value, onChange, onSubmit, children 
		} = this.props;
		
		return(
				
			<form onSubmit={onSubmit} >
				<input 
				value={value}
				onChange={onChange} 
				type='text'
				ref = {el => this.input = el} 
				/>

				<button type='submit'>
					{children}
				</button>
			</form>
		)
	}
}		
    
export default Search;