import React from 'react'
import styles from '../styles/Pagination.module.css'
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className= {styles.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className= {styles.pagination_button}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default Pagination