import React, { useEffect, useState } from "react";
import Cards from './Cards'                                                                 
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./Pagination";
import Nav from "./Nav";                                                                    
import { getDogs } from '../redux/actions'
import styles from '../styles/Home.module.css'
const Home = () => {                                                                          
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.filteredDogs)                              
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    useEffect(() => {                                                                       
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {                                                                       
        setCurrentPage(1)
    }, [allDogs])

    const lastItemIndex = currentPage * itemsPerPage                                       
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItems = allDogs.slice(firstItemIndex, lastItemIndex)                       
    const paginate = (pageNumber) => {                                                      
        if (pageNumber >= 1 && pageNumber <= Math.ceil(allDogs.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    }

    return (
        <div className={styles.background} >
            <Nav />                                                                         
            <Cards dogs={currentItems} />                                                   
            <Pagination                                                                     
                itemsPerPage={itemsPerPage}
                totalItems={allDogs.length}
                paginate={paginate}
                currentPage={currentPage} />                                                 
        </div>
    )
}

export default Home