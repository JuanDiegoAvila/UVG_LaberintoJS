import idle from '../../public/img/IDLE.gif'
import right from '../../public/img/RIGHT.gif'
import left from '../../public/img/LEFT.gif'
import up from '../../public/img/UP.gif'
import down from '../../public/img/DOWN.gif'
import win from '../../public/img/WIN.gif'

import {useState, useEffect} from 'react'

const Player = ({estado}) => {

    const [url, setUrl] = useState(null)

    useEffect(()=> {
        switch(estado){
            case 'left':
                setUrl(left)
                break;
            case 'down':
                setUrl(down)
                break;
            case 'right':
                setUrl(right)
                break;
            case 'up':
                setUrl(up)
                break;
            case 'win':
                setUrl(win)
                break;
            case 'idle':
                setUrl(idle)
                break;
        }
    },[estado])


    return (
        <div css = {{
            backgroundImage: `url(${url})`, 
            height: '50px', 
            width: '50px', 
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat'}}/>
    )

}



export default Player