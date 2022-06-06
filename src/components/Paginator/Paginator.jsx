import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import s from './Paginator.module.css'

const Paginator = ({setPage, totalCount, count=10, page})=>{
    const dispatch = useDispatch()
    const paginatorAll = []
    const pageCount = Math.ceil(totalCount/count)

    for(let i = 1; i < pageCount+1; i++){
        paginatorAll.push(i)
    }

    const leftPortionClick = ()=>{
        setPortionNumber(portionNumber-1)
        setPage(leftPortionSize-10)

    }
    const rightPortionClick = ()=>{
        setPortionNumber(portionNumber+1)
        setPage(rightPortionSize+1)

    }
 
const portionCount = Math.ceil(pageCount/10)
const [portionNumber, setPortionNumber] = useState(1)
const leftPortionSize = (portionNumber-1)*10+1
const rightPortionSize = portionNumber * 10


    return <div className={s.paginator} >
        {portionNumber>1&&<button className={s.btn} onClick={leftPortionClick}>Назад </button>}
        {paginatorAll.length>1&&paginatorAll.map(el=>{
            if(el>=leftPortionSize&&el<=rightPortionSize){
                return <span key={el} onClick={()=>{
                    dispatch(setPage(el))
                }} className={`${s.el} ${page===el&&s.active}`}>{el}</span>
            }
        })}
                {portionNumber<portionCount&&<button className={s.btn} onClick={rightPortionClick}>Вперед </button>}



    </div>
}

export default Paginator