import React from "react";
import { useHistory } from "react-router-dom";

export default function Card({ id, name, image, temperament, weight }) {
    const history = useHistory();

    return (
        <div className="card">
            <h3>{name}</h3>
            <img src={image} alt={name} onClick={() => history.push(`/detail/${id}`)}></img>
            <p>Temperaments: {temperament}</p>
            <p>Weight: {weight}</p>
            
        </div>
    )
}