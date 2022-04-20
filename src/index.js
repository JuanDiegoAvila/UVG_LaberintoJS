import React from 'react'
import Maze from './components/maze.jsx'
import Title from '../public/img/Title.png'
import won from '../public/img/won.png'

import { useState } from 'react'
import {createRoot} from 'react-dom/client'


const App = () => {

    const [play, setPlay] = useState(false)
    const [gano, setGano] = useState(false)

    return (
        <div css = {{
            width: '100%',
            height: '100%',

        }}>
            {
                gano ? 
                    <div css = {{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E6833A',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                    
                        <div css = {{backgroundImage: `url(${won})`, height: '400px', width: '700px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', marginTop:'10px'}}/>
                        <button css={{color: 'white', marginTop: '40px', backgroundColor: '#994D17', border: '0px', borderRadius: '5px', alignSelf: 'center', width: '200px', height: '60px'}} onClick={()=>{ setGano(!gano); setPlay(!play)}}>Reiniciar</button>
                    </div>
                :
                    play ?
                    <Maze setGano={setGano} gano={gano}/>
                    :
                    <div css = {{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E6833A',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                       
                        <div css = {{backgroundImage: `url(${Title})`, height: '400px', width: '700px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', marginTop:'10px'}}/>
                        <button css={{color: 'white', marginTop: '40px', backgroundColor: '#994D17', border: '0px', borderRadius: '5px', alignSelf: 'center', width: '200px', height: '60px'}} onClick={()=>{ setPlay(!play)}}>Empezar</button>
                    </div>
                
            }
            
            
        </div>
    )
}


const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home" />)
