import { useState } from 'react'
import slime from './assets/slime.svg'
import './App.css'
import monsterJson from './json/monsters.json'

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

function MonsterDetail(){

  const result = monsterJson.monsters.map((mon, index) => (

    <article key={index} id='monsterDetailContainer' >
      <img className='monsterSprite' src={mon.spriteUrl} alt='monster sprite'></img>
      <aside id='detailGrid'>
        <div><p>Name: {mon.name}</p> <p>ID: {mon.id}</p></div>
        <div><p>Rank: {mon.rank}</p> <p>Family: {mon.family}</p> <p>Skillset: {mon.skillset}</p></div>
        <div><p>Trait 1: {mon.trait1}</p> <p>Trait 2: {mon.trait2}</p> <p>Resistances: {mon.resistances}</p></div>
      </aside>
    </article>
    
  ))

  return (

    <section>
      {result}
    </section>
    
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

      <MonsterDetail/>
    </main>
  )
}

export default App
