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

function SearchBar(){
  let [query, setQuery] = useState("")
  let inputRef = useRef()
  let val = ""

  const filtered = monsterJson.monsters.filter(mon => {
    return mon.name.toLowerCase().includes(query.toLowerCase())
  })

  const filteredItems = filtered.map(mon=>(<p key={mon.id}>{mon.name}</p>))

  function handleSearch(e){
    e.preventDefault()
    val = inputRef.current.value
    if (val === "") return

    inputRef.current.value = ""

  }

  return(

    <div>
    <form id='searchBox' onSubmit={handleSearch}>
      <input value={query} onChange={e=>setQuery(e.target.value)} ref={inputRef} type="search" id='searchBar' placeholder='search by Name or ID'/>
      <button autoFocus type='submit'></button>
    </form>

    {query === "" ? <></> : <section id='searchResults'>{filteredItems}</section>}
    
    </div>
  )
}

function MonsterDetail({monsterList}){
  let [currentMonster, setCurrentMonster] = useState(0)

  function handlePrev(){
    setCurrentMonster(i => i - 1)
    console.log(currentMonster)
    if (currentMonster <= 0){
      setCurrentMonster(monsterList.length-1)
    }
  }
  function handleNext(){
    setCurrentMonster(i => i + 1)
    console.log(currentMonster)
    if (currentMonster >= monsterList.length-1){
      setCurrentMonster(0)
    }
  }

  const result = monsterJson.monsters.map((mon, index) => (
    <article key={index} className='monsterDetailContainer' id={index == currentMonster ? "activeCard" : ""}>
      <div className='detailsWrapper'>
        
      <aside className='detailGrid'>
        <div>
          <span><strong>{mon.name}</strong></span> 
          <span>ID # <strong>{mon.id}</strong></span>
        </div>
        <div>
          <img className='monsterSprite' src={mon.spriteUrl} alt='monster sprite'></img>
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
      </div>
    </article>
  ))
  return (
    <div>
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
  let mList = document.getElementsByClassName("monsterDetailContainer")

  return (
    <main>
      <div id='topBar'>
        <HeaderCom/>

        <SearchBar/>
      </div>
        
      <MonsterDetail monsterList={mList}/>
    </main>
  )
}

export default App
