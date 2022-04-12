import React from 'react'
import {useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

const App = () => {

    const [laberinto, setLaberinto] = useState([])
    const [actual, setActual] = useState('')

    const getMaze = async () => {
        
        
    }
    useEffect(() => {
        async function getMaze() {
            let fet = "https://maze.juanelcaballo.club/?type=json&w=4&h=4"

            const response = await fetch(fet)
                .then((response) => { return response.json() }
                ).then((responseInJSON) => { return responseInJSON })

            setLaberinto([...response])
        }
        getMaze()
       
    },[])

    return (
        <div>
            {
                laberinto.map((row, index) => {
                    row.forEach(element => {

                        switch(element){
                            case " ":
                                actual = actual+' espacio '
                                break;
                            case "-":
                                actual = (actual+' piso ') 
                                break;
                            case "+":
                                actual = (actual+' columna ') 
                                break;
                            case "|":
                                actual = (actual+' pared ') 
                                break;
                        }
                        
                    });
                    return (
                        <div key = {index}>{actual}</div>
                    )
                })

            }
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home"/>)
