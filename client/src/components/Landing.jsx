import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {

    return (
        <div>
            <div>
                <h1>¡Bienvenidos a la App sobre perritos!</h1>
                <Link to="/home">
                    <button>Entrar</button>
                </Link>
            </div>
        </div>
    )
}