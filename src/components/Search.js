import React from 'react';
import axios from 'axios';

import '../StyleSheet/Search.css';
import Loader from '../StyleSheet/loader.gif';

class Search extends React.Component {
  constructor( props ) {
    super ( props );

    this.state = {
      query: '',
      results: {},
      loading: false,
      message: ''

    };
    this.cancel = ''

    }
  fetchSearchResults = (updatedPageNo = '', query) => {
    const pageNumber = updatedPageNo ? `&page = ${updatedPageNo}`: '';
    const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

    if ( this.cancel) {
      this.cancel.cancel();
      }
      this.cancel = axios.CancelToken.source();
      axios.get( searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
			const resultNotFoundMsg = !res.data.hits.length
				? 'There are no more search results. Please try a new search.'
				: '';

        this.setState ({
        results: res.data.hits,
        message: resultNotFoundMsg,
        loading: false
            })
      })
      .catch((error) => {
        if (axios.isCancel (error) || error) {
          this.setState ({
            loading: false,
            message: 'Failed to Fetch'
          })
        }
      })
  };

  renderSearchResults = () => {
	const {results} = this.state;
	if (Object.keys(results).length && results.length) {
		return (
			<div className="results-container">
				{results.map((result) => {
					return (
						<a key={result.id} href={result.largeImageURL} className="result-items">
							<h6 className="image-username">{result.user}</h6>
							<div className="image-wrapper">
								<img className="image" src={result.webformatURL} alt={result.user}/>
							</div>
						</a>
					);
				})}
			</div>
		);
	}
};

handleOnInputChange = (event) => {
	const query = event.target.value;
	if ( ! query ) {
		this.setState({ query, results: {}, message: '' } );
	} else {
		this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
		});
	}
};

  render() {
  	const { query, message, loading } = this.state;
  	return (
  		<div className="container">
  			{/*Heading*/}
  			<h2 className="heading">Image Search</h2>
  			{/*Search Input*/}
  			<label className="search-label" htmlFor="search-input">
  				<input
  					type="text"
  					value={query}
  					id="search-input"
  					placeholder="Search..."
  					onChange={this.handleOnInputChange}
  				/>
  				<i className="fa fa-search search-icon"/>
  			</label>
				    {message && <p className="message">{ message }</p>}

			     <img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>

  			{ this.renderSearchResults() }
  		</div>
  		)
  }
}

export default Search;
