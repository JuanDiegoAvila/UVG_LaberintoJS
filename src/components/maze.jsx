import { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Player from './player.jsx'
import pared from '../../public/img/PARED.png'
import goal from '../../public/img/GOAL.png'
import audio from '../../public/audio/fondo.mp3'

const Maze = ({ setGano }) => {
  const sound = new Audio(audio)
  const [laberinto, setLaberinto] = useState([])
  const [estado, setEstado] = useState('idle')
  const [height, setHeight] = useState(4)
  const [width, setWidth] = useState(4)
  let win = false

  const getMaze = async () => {
    const fet = `https://maze.juanelcaballo.club/?type=json&w=${width}&h=${height}`
    const response = await fetch(fet)
      .then((resp) => resp.json())
      .then((responseInJSON) => responseInJSON)
    setLaberinto([...response])
  }

  const getlistener = useCallback((event) => {
    if (!win) {
      const { key } = event
      setLaberinto((oldState) => {
        let x = oldState.findIndex((row) => row.indexOf('p') > -1)
        let y = oldState[x].indexOf('p')
        const newL = [...oldState]
        switch (key) {
          case 'ArrowLeft':
          case 'a':
            setEstado('left')
            if (newL[x][y - 1] === ' ') {
              newL[x][y] = ' '
              newL[x][y - 1] = 'p'
              y -= 1
              return newL
            } if (newL[x][y - 1] === 'g') {
              newL[x][y] = ' '
              newL[x][y - 1] = 'p'
              y -= 1
              setEstado('win')
              win = true
              setTimeout(() => { sound.pause(); setGano(true) }, 3000)
            }
            break
          case 'ArrowRight':
          case 'd':
            setEstado('right')
            if (newL[x][y + 1] === ' ') {
              newL[x][y] = ' '
              newL[x][y + 1] = 'p'
              y += 1
              return newL
            } if (newL[x][y + 1] === 'g') {
              newL[x][y] = ' '
              newL[x][y + 1] = 'p'
              y += 1
              setEstado('win')
              win = true
              setTimeout(() => { sound.pause(); setGano(true) }, 3000)
            }
            break
          case 'ArrowUp':
          case 'w':
            setEstado('up')
            if (newL[x - 1][y] === ' ') {
              newL[x][y] = ' '
              newL[x - 1][y] = 'p'
              x -= 1
              return newL
            } if (newL[x - 1][y] === 'g') {
              newL[x][y] = ' '
              newL[x - 1][y] = 'p'
              x -= 1
              setEstado('win')
              win = true
              setTimeout(() => { sound.pause(); setGano(true) }, 3000)
            }
            break
          case 'ArrowDown':
          case 's':
            setEstado('down')
            if (newL[x + 1][y] === ' ') {
              newL[x][y] = ' '
              newL[x + 1][y] = 'p'
              x += 1
              return newL
            } if (newL[x + 1][y] === 'g') {
              newL[x][y] = ' '
              newL[x + 1][y] = 'p'
              x += 1
              setEstado('win')
              win = true
              setTimeout(() => { sound.pause(); setGano(true) }, 3000)
            }
            break
          default:
            break
        }
        return newL
      })
    }
  }, [])

  useEffect(() => {
    getMaze()
    document.addEventListener('keydown', getlistener)
    sound.play()
    sound.loop = true
    sound.volume = 0.2
  }, [])

  return (
    <div css={{
      width: '100%',
      height: '100%',
      backgroundColor: '#E6833A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <div css={{
        color: 'white',
        textAlign: 'center',
        width: '100%',
        paddingTop: '20px',
      }}
      >
        <h1>Cowboys Maze</h1>
      </div>
      <div css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: '0px',
        paddingBottom: '10px',
      }}
      >
        <input
          css={{
            marginRight: '10px',
            backgroundColor: '#FF9E59',
            border: '0px',
            borderRadius: '5px',
          }}
          placeholder="Altura"
          onChange={(e) => setHeight(e.target.value)}
          value={height}
        />
        <input
          css={{
            marginRight: '10px',
            backgroundColor: '#FF9E59',
            border: '0px',
            borderRadius: '5px',
          }}
          placeholder="Ancho"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <button
          type="button"
          css={{
            color: 'white',
            marginRight: '10px',
            backgroundColor: '#994D17',
            border: '0px',
            borderRadius: '5px',
          }}
          onClick={() => { getMaze() }}
        >
          Actualizar
        </button>
      </div>
      <div css={{
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80vw',
        height: '500px',
        backgroundColor: '#F7943E',
        padding: '20px',
        overflow: 'scroll',
      }}
      >
        {
          laberinto.map((row, i) => (
            <div
              key={i.id}
              css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {row.map((element, i2) => {
                if (element === '+' || element === '-' || element === '|') {
                  return (
                    <div
                      key={i2.id}
                      css={{
                        backgroundImage: `url(${pared})`,
                        height: '50px',
                        width: '50px',
                        backgroundSize: 'contain',
                      }}
                    />
                  )
                } if (element === 'p') {
                  return (
                    <Player key="player" estado={estado} />
                  )
                } if (element === 'g') {
                  return (
                    <div
                      key={i2.id}
                      css={{
                        backgroundImage: `url(${goal})`,
                        height: '50px',
                        width: '50px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )
                }
                return (
                  <div key={i2.id} css={{ height: '50px', width: '50px', border: '10px' }} />
                )
              })}
            </div>

          ))

      }

      </div>
    </div>
  )
}

Maze.propTypes = {
  setGano: PropTypes.func,
}
export default Maze
