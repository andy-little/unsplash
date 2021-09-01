import React from 'react'
import { useGlobalContext } from './context'
import Photo from './Photo'
import Search from './Search';
import Switch from './Switch';



function App() {
  const {photos, loading} = useGlobalContext();
  return <main>
    <nav>
      <Search/>
      <Switch/>
    </nav>
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
