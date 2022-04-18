import React from 'react'

import {styled} from '@linaria/react'
import {useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'

const App = () => {
    
    const Background = styled.div`
        background-color: #000000;
        display: flex;
        flex-direction: column;
        color: #FF5733;
    `;

    const [laberinto, setLaberinto] = useState([])
    const [height, setHeight] = useState(4)
    const [width, setWidth] = useState(4)
    
    const getMaze = async () => {
        
        let fet = "https://maze.juanelcaballo.club/?type=json&w="+width+"&h="+height
        console.log(fet)
        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setLaberinto([...response])
    
    }

    useEffect(() => {
        getMaze()
    },[])

    return (
        <div className={Background} id="maze">
            <input onChange={(e) => setHeight(e.target.value)} value={height}></input>
            <input onChange={(e) => setWidth(e.target.value)} value={width}></input>
            <button onClick={()=>getMaze()}>Actualizar</button>
            {
                
                laberinto.map((row, index) => {
                    row.map((row, index) => {

                    })
                    return (
                        <div key = {index}>{row}</div>
                    )
                })

            }
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home"/>)


document.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "ArrowLeft":
        case "a":
            console.log("Izquierda");
            break;
        case "ArrowRight":
        case "d":
            console.log("derecha");
            break;
        case "ArrowUp":
        case "w":
            console.log("arriba");
            break;
        case "ArrowDown":
        case "s":
            console.log("abajo");
            break;
    }
});
