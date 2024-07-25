import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/Card.module.css";

export default function Card({ id, name, image, temperament, weight }) {
    const history = useHistory();

    return (
        <div className={styles.container}>
            <h3 className={styles.description}>{name}</h3>
            <img src={image} alt={name} onClick={() => history.push(`/detail/${id}`)} className={styles.container_img}></img>
            <p className={styles.description}>Temperaments: {temperament}</p>
            <p className={styles.description}>Weight: {weight}</p>
            
        </div>
    )
}