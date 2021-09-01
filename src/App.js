import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalContext } from './context'
import Photo from './Photo'



function App() {
  const {photos, loading, searchSubmit, query, setQuery} = useGlobalContext();
  return <main>
    <section className="search">
      <form onSubmit={searchSubmit} className="search-form">
        <input className='form-input' type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)}/>
        <button className="submit-btn"><FaSearch/></button>
      </form>
    </section>
    <section className="photos">
      <div className="photos-center">

    {photos.map((item, index)=>{
      return <Photo key={index} {...item}/>
    })}
      </div>
      {loading && <h2 className="loading">Loading...</h2>}
    </section>
  </main>
}

export default App
