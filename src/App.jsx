import { useState } from 'react'
import slime from './assets/slime.svg'
import './App.css'


/*

  COMPONENTS

*/
function HeaderCom(){
  return (
    <header>
      <img src={slime} alt="slime icon" />
      <span>DQMJ INDEX</span>
    </header>
  )
}

function SearchBar(){
  return(
    <form id='searchBox'>
      <input type="search" id='searchBar' placeholder='Look up a monster by Name or ID'/>
      <button autoFocus type='button' onClick={handleSearch}></button>
    </form>
  )
}

/*

  extra functionalities

*/

function handleSearch(){

  let searchBar = document.getElementById("searchBar")
  searchBar.value = ""

  return false
}


function App() {

  return (
    <main>
      <HeaderCom/>

      <SearchBar/>

      <section></section>
    </main>
  )
}

export default App
