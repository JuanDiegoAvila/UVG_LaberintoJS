import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

const App = () => {
    return (
        <div>
            <h1>Hello from react</h1>
            <button>hola</button>
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home"/>)
