import { useRef, useState } from 'react'
import slime from './assets/slime.svg'
import './App.css'
import monsterJson from './json/monsters.json'

let mList = document.getElementsByClassName("monsterDetailContainer")

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
  let [slideIndex, setSlideIndex] = useState(0)
  for(let i = slideIndex; i < mList.length; i++){
    mList[i].style.display = "none"
  }

  function mListNext(){
    if (slideIndex > mList.length){
      slideIndex = 0
    } else {
      setSlideIndex(slideIndex + 1)
    }
    console.log(slideIndex)
  }
  function mListPrev(){
    
    if (slideIndex < 0){
      slideIndex = mList.length
    } else {
      setSlideIndex(slideIndex - 1)
    }
    console.log(slideIndex)
  }

  const result = monsterJson.monsters.map((mon, index) => (

    <article key={index} className='monsterDetailContainer' >
      <img className='monsterSprite' src={mon.spriteUrl} alt='monster sprite'></img>
      <aside className='detailGrid'>
        <div>
          <span><strong>{mon.name}</strong></span> 
          <span>ID # <strong>{mon.id}</strong></span>
        </div>
        <div>
          <span>Rank: <strong>{mon.rank}</strong></span> 
          <span>Family: <strong>{mon.family}</strong></span> 
          <span>Skillset: <strong>{mon.skillset}</strong></span>
        </div>
        <div>
          <span>Traits: <strong>{mon.trait1}</strong> <strong>{(mon.trait2 != "") ? `& ${mon.trait2}` : ""}</strong></span>
        </div>
        <div>
          <span>Resistances: <strong>{mon.resistances}</strong></span>
        </div>
      </aside>
    </article>
  ))

  return (

    <section id='monsterCollection'>
      {result}

      <div id='arrowContainer'>
        <button className='ArrowCircle' type='button' onClick={mListPrev}>
          <div id='leftArrow'></div>
        </button>
        <button className='ArrowCircle' type='button' onClick={mListNext}>
          <div id='rightArrow'></div>
        </button>
      </div>
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
      <div id='topBar'>
        <HeaderCom/>

        <SearchBar/>
      </div>
        
      <MonsterDetail/>

    </main>
  )
}

export default App
