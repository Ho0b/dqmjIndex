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
      <img src={slime} alt="slime icon" />
      <span>DQMJ INDEX</span>
    </header>
  )
}

function SearchBar({currentMonster, setCurrentMonster}){
  let [query, setQuery] = useState("")
  let inputRef = useRef()
  let val = ""

  const filtered = monsterJson.monsters.filter(mon => {
    return mon.name.toLowerCase().includes(query.toLowerCase())
  })

  const filteredItems = filtered.map(mon=>(<button className='resultButton' type='buton' key={mon.id} onClick={()=>{setCurrentMonster(Number(mon.id)-1); setQuery("")}}><p key={mon.id}>{mon.name}</p></button>))

  function handleSearch(e){
    e.preventDefault()
    val = inputRef.current.value
    if (val === "") return

    inputRef.current.value = ""

  }

  return(

    <div>
    <form id='searchBox' onSubmit={handleSearch}>
      <input autoComplete='off' value={query} onChange={e=>setQuery(e.target.value)} ref={inputRef} type="search" id='searchBar' placeholder='search by Name or ID'/>
      <button type='submit'></button>
    </form>

    {query === "" ? <></> : <section id='searchResults'>{filteredItems}</section>}
    
    </div>
  )
}

function MonsterDetail({monsterList, currentMonster, setCurrentMonster}){
  function handlePrev(){
    setCurrentMonster(i => i - 1)
    if (currentMonster <= 0){
      setCurrentMonster(monsterList.length-1)
    }
  }
  function handleNext(){
    setCurrentMonster(i => i + 1)
    if (currentMonster >= monsterList.length-1){
      setCurrentMonster(0)
    }
  }

  const result = monsterJson.monsters.map((mon, index) => (
    <article key={index} className='monsterDetailContainer' id={index == currentMonster ? "activeCard" : ""}>
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
          <div><span>Rank:</span><p>{mon.rank}</p></div>
          <div><span>Family:</span><p>{mon.family}</p></div>
          <div><span>Skillset:</span><p>{mon.skillset}</p></div>
        </div>
        <div className='statsRow'>
          <div>
            <span>Traits:</span>
            <p>{mon.trait1 === "" ? "None" : mon.trait1} {(mon.trait2 != "") ? `& ${mon.trait2}` : ""}</p>
          </div>
        </div>
        <div className='statsRow'>
          <div>
            <span>Resistances:</span>
            <p>{mon.resistances === "" ? "None" : mon.resistances}</p>
          </div>
        </div>
      </aside>
      </div>
    </article>
  ))
  return (
    <div id='mainContent'>
      <section id='monsterCollection'>
      {result}
      </section>

      <div id='arrowContainer'>
      <button className='ArrowCircle' type='button' onClick={handlePrev}>
        <div id='leftArrow'></div>
      </button>
      <button className='ArrowCircle' type='button' onClick={handleNext}>
        <div id='rightArrow'></div>
      </button>
      </div>
    </div>
    
  )
}


/*

  extra functionalities

*/




function App() {
  let [currentMonster, setCurrentMonster] = useState(0)
  let mList = document.getElementsByClassName("monsterDetailContainer")

  return (
    <main>
      <div id='topBar'>
        <HeaderCom/>

        <SearchBar currentMonster={currentMonster} setCurrentMonster={setCurrentMonster}/>
      </div>
        
      <MonsterDetail monsterList={mList} currentMonster={currentMonster} setCurrentMonster={setCurrentMonster}/>
    </main>
  )
}

export default App
