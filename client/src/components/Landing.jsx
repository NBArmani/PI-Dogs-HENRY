import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Landing.module.css'
export default function Landing() {

    return (
        <div>
            <div className={styles.background}>
                <h1 className={styles.h1}>¡Bienvenidos a la App sobre perritos!</h1>
                <h2 className={styles.h2}>En esta página encontrarás información sobre las diferentes razas de perros que hay en el mundo. ¡Acompáñanos!</h2>
                <Link to="/home">
                    <button className={styles.button}>Entrar</button>
                </Link>
            </div>
            <footer className= {styles.footer} >
                <p>
                    Hecho por Nadia Armani para Henry © 2024
                </p>
            </footer>
        </div>
    )
}