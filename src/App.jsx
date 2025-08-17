import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/a.png", matched: false },
  { "src": "/img/b.png", matched: false },
  { "src": "/img/c.png", matched: false },
  { "src": "/img/d.png", matched: false },
  { "src": "/img/e.png", matched: false },
  { "src": "/img/f.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null) 
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) =>({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        setTimeout(() => resetTurn(), 1000)
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
   const allMatched = cards.length > 0 && cards.every(card => card.matched)
  return (
    <>
      <div className="App">
        <h3>Bienvenidos Tomi y Oti a:</h3>
        <h1>Ready Player Two</h1>
        <h3>Dia del Niño Edition</h3>
        <h4>El regalo se encuentra escondido. Solo ganar les dara acceso.</h4>
        <h4>Buena suerte.</h4>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched }
              disabled={disabled}
            />
         ))}
        </div>
        
        {allMatched ? <p>MUY FELIZ DIA DEL NIÑOOOO!!!, llave desbloqueada. Ahora solo deben encontrar la cerradura.</p>: <p>Turns: {turns}</p>}
      </div>
    </>
  )
}

export default App
