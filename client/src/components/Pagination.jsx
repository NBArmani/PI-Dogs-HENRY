import React from 'react'
import styles from '../styles/Pagination.module.css'
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
   
    const pageNumbers = []                                  
    const totalPages = Math.ceil(totalItems / itemsPerPage) 
   
    for (let i = 1; i <= totalPages; i++) {                 
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                <li>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.pagination_button}
                    >
                        ⪡ Back
                    </button>
                </li>

                
                {pageNumbers.map(number => (
                    <li key={number} className={styles.pageItem}>
                        <button
                            onClick={() => paginate(number)}
                            className={`${styles.pagination_button} ${currentPage === number
                                ? styles.active
                                : styles.inactive}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.pagination_button}
                    >
                        Next ⪢
                    </button>
                </li>
            </ul>
        </nav>
    );
}


export default Pagination