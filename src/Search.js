import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalContext } from './context'

const Search = () => {
    const {query, setQuery, searchSubmit} = useGlobalContext();
    return (
        
      <form onSubmit={searchSubmit} className="search-form">
        <input className='form-input' type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)}/>
        <button className="submit-btn"><FaSearch/></button>
      </form>
    
    )
}

export default Search
