import { useRef, useState } from 'react'
import slime from './assets/slime.svg'
import './App.css'
import monsterJson from './json/monsters.json'

/*

  COMPONENTS

*/
function HeaderCom(){
  return (
    <header>
      <img id='titleImg' src={slime} alt="slime icon" />
      <span>DRAGON QUEST INDEX</span>
    </header>
  )
}

function SearchBar({currentMonster, setCurrentMonster, isCatalogActive, showCatalog, modal}){
  let [query, setQuery] = useState("")
  let inputRef = useRef()
  let val = ""

  const filtered = monsterJson.monsters.filter(mon => 
    {
      if (Number(query)){
        return mon.id.toLowerCase().includes(query.toLowerCase())
      } else {
        return mon.name.toLowerCase().includes(query.toLowerCase())
      }
    }
  )

  const filteredItems = filtered.map(mon =>
    (
    <button 
      className='resultButton' 
      type='buton' 
      key={mon.id}
      aria-label='result button'
      onClick={
        ()=>{
          setCurrentMonster(Number(mon.id)-1); setQuery("")
        }
        }>
      <img className="resultButtonImg" src={mon.spriteUrl} height={40} width={40} alt={mon.name + " sprite icon"}/>
      <span className="resultButtonText" key={mon.id}>{mon.name}</span>
    </button>
    )
  )

  function handleSearch(e){
    e.preventDefault()
    val = inputRef.current.value

    let parsedInput = Number(query)
    if (parsedInput === 0 || parsedInput <= 0 || parsedInput > 210 || isNaN(parsedInput)) return
    console.log(parsedInput)
    setCurrentMonster(parsedInput-1)

    if (val === "") return
    inputRef.current.value = ""
    setQuery("")

  }
  
  return(

    <div>
    <button aria-label='catalog button' id="bookMenu" onClick={()=>{showCatalog(true); modal.showModal()}}></button>

    <div id='searchBoxWrapper' aria-label='search box'>
      <form aria-label='form box' id='searchBox' onSubmit={handleSearch}>
        <input aria-label='form search box' autoComplete='off' value={query} onChange={e=>setQuery(e.target.value)} ref={inputRef} type="search" id='searchBar' placeholder='search by Name or ID'/>
      </form>
    </div>

    {query === "" ? <></> : <section id='searchResults'>{filteredItems}</section>}
    
    </div>
  )
}

function MonsterDetail({monsterList, currentMonster, setCurrentMonster}){
  let [direction, setDirection] = useState("")
  
  function handlePrev(){
    setCurrentMonster(i => i - 1)
    setDirection("l")
    if (currentMonster <= 0){
      setCurrentMonster(monsterList.length-1)
    }
  }
  function handleNext(){
    setCurrentMonster(i => i + 1)
    setDirection("r")
    if (currentMonster >= monsterList.length-1){
      setCurrentMonster(0)
    }
  }

  function directionSwitch(){
    if (direction == "l") {
      return "cardGoRight"
    }
    else if (direction == "r") {
      return "cardGoLeft"
    } else {
      return "activeCard"
    }
    
  }

  const result = monsterJson.monsters.map((mon, index) => (
    <article key={index} className="monsterDetailContainer" id={index == currentMonster ? directionSwitch() : ""}>
      <div className='detailsWrapper'>
        
      <aside className='detailGrid'>
        <div>
          <div><p id='monsterName'>{mon.name}</p></div>
          <div className='monsterId'><span id='poundSign'>#</span><span id='numberSign'>{mon.id}</span></div>
        </div>
        <div>
          <img className='monsterSprite' src={mon.spriteUrl} alt='monster sprite'></img>
        </div>
        <div className='statsRow'>
          <div><span>RANK</span><p>{mon.rank}</p></div>
          <div><span>FAMILY</span><p>{mon.family}</p></div>
          <div><span>SKILLSET</span><p>{mon.skillset}</p></div>
        </div>
        <div className='statsRow'>
          <div>
            <span>TRAITS</span>
            <p>{mon.trait1 === "" ? "None" : mon.trait1} {(mon.trait2 != "") ? `& ${mon.trait2}` : ""}</p>
          </div>
        </div>
        <div className='statsRow'>
          <div>
            <span>RESISTANCES</span>
            <p>{mon.resistances === "" ? "None" : mon.resistances}</p>
          </div>
        </div>
      </aside>
      </div>
    </article>
  ))
  return (
    <div id='mainContent' aria-label='main'>
      <section id='monsterCollection' aria-label='card'>
      {result}
      </section>

      <div id='arrowContainer' aria-label='navigation buttons'>
      <button aria-label='previous card' className='ArrowCircle' type='button' onClick={handlePrev}>
        <div id='leftArrow'></div>
      </button>
      <button aria-label='next card' className='ArrowCircle' type='button' onClick={handleNext}>
        <div id='rightArrow'></div>
      </button>
      </div>
    </div>
    
  )
}


function ShowFullList({modal, toggleModal}){

  let fullList = monsterJson.monsters.map((mon, index)=>(
    <figure key={index}>
      <span>{mon.id}</span>
      <img src={mon.spriteUrl} alt={mon.name + " sprite icon"}></img>
      <figcaption>{mon.name}</figcaption>
    </figure>
  ))

  return (
    <dialog id='listWrapper' aria-label='catalog'>
      <section>
        <div>
          <button aria-label='catalog close button' autoFocus type='button' id="xButton" onClick={()=>{modal.close(); toggleModal(false)}}></button>
          <p>Monster Catalog</p>
        </div>
        <article id='fullList'>
          {fullList}
        </article>
      </section>
    </dialog>
  )
}

/*

  extra functionalities

*/




function App() {
  let [currentMonster, setCurrentMonster] = useState(0)
  let [isFullListActive, setFullList] = useState(false)
  let mList = document.getElementsByClassName("monsterDetailContainer")
  let catalogModal = document.getElementById("listWrapper")

  return (
    <main>
      <div id='topBar' aria-label='header'>
        <HeaderCom/>

        <SearchBar 
        currentMonster={currentMonster} 
        setCurrentMonster={setCurrentMonster}
        isCatalogActive={isFullListActive}
        showCatalog={setFullList}
        modal={catalogModal}
        />
      </div>
      
      <ShowFullList modal={catalogModal} toggleModal={setFullList}/>

      <MonsterDetail 
      monsterList={mList} 
      currentMonster={currentMonster} 
      setCurrentMonster={setCurrentMonster}
      />
    </main>
  )
}

export default App
