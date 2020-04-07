import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Table from './containers/Table/Table';
import Search from './components/Search/Search';
import Button from './components/Button/Button';
import  {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_HPP,
	PARAM_PAGE,
	PARAM_SEARCH
} from './constants/constants';



const updateSearchTopStoriesState = (hits, page) => (prevState) => {
	const { searchKey, results } = prevState;

		const oldHits = results && results[searchKey] 
			? results[searchKey].hits
			: [];

		const updatedHits = [
			...oldHits, ...hits
		];

		return{
			results: { 
				...results, 
				[searchKey]: { hits: updatedHits, page} 
			},
			isLoading: false
		};
};


class App extends Component {

  constructor (){
	super();
	
    this.state = {
	  results: null,
	  searchKey: '',
	  search: DEFAULT_QUERY,
	  error: null,
	  isLoading: false,
    }
  };

  needsToSearchTopStories = (search) => {
	  const { results } = this.state;
	  return !results[search];
  }

  onDismiss = (id) => {

	const { searchKey, results } = this.state;
	const { hits, page } = results[searchKey];

    const isNotId = item => item.objectsID !== id;
	const updatedHits = hits.filter(isNotId);
	
    this.setState({ 
		results: { 
			...results, 
			[searchKey]: { hits: updatedHits, page }
		}	 
		// result: Object.assign({}, this.state.result, {hits: updatedHits})
	});
	
  }
 
  searchChange = (events) => {
    //console.log(events.target.value)
    this.setState({ search: events.target.value})
  }

  setSearchTopStories = (result) => {
		const { hits, page } = result;
		this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories = ( search, page=0 ) => {
		this.setState({ isLoading: true });

		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${search}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(result => this.setSearchTopStories(result.data))
		.catch(error => this.setState({error}));
  }

  componentDidMount() {
	  const { search } = this.state;
	  this.setState({ searchKey: search});
	  this.fetchSearchTopStories(search);

  }

  onSearchSubmit = (event) => {
	  const { search } = this.state;
	  this.setState({ searchKey: search});

	  if (this.needsToSearchTopStories(search)) {
		  this.fetchSearchTopStories(search);
	  }
	  
	  event.preventDefault();
  }

  render() {

	const { search, results, searchKey, error, isLoading } = this.state;

	const page = (
		results && 
		results[searchKey] &&
		results[searchKey].page
	) || 0;

	const list = (
		results &&
		results[searchKey] &&
		results[searchKey].hits
	) || [];
	

	// console.log(this.state)
    return (
		<div className="page">
			<div className='interactions'>
				<h1>World News</h1>
				<Search 
					onChange={this.searchChange} 
					onSubmit={this.onSearchSubmit}
					value={search} 
				>
					Search
				</Search>
			</div>    
			{ error
				? <div className='interactions'>
					<p>Something went wrong</p>
				</div>
				: <Table
					list={list}
					onDismiss={this.onDismiss}
				/>
  			}	
  			
			<div className='interactions'>
				<ButtonWithLoading
					isLoading = {isLoading}
					onClick={() => this.fetchSearchTopStories( searchKey, page + 1 )} >
						More
				</ButtonWithLoading>	
  					
			</div>
			  
		</div>
    )
 }
}

const withLoading = (Component) => ({isLoading, ...rest}) =>
	isLoading
		? <Loading />
		: <Component {...rest} />

const ButtonWithLoading = withLoading(Button);

const Loading = () => 
	<div>Loading....</div>

export default App;

export {
	Button,
	Table,
	Search,
}