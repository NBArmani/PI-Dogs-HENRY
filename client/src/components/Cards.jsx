import React from 'react'
import Card from './Card'
import styles from '../styles/Cards.module.css'
const Cards = ({ dogs }) => {
    return (
        <div className={styles.container}>
            {dogs.map((dog) => {
                return (
                    <Card
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperament={dog.temperament || 'no hay temperamentos'}
                        weight={dog.weight}
                    />
                )
            })}
        </div>
    )
}

export default Cards