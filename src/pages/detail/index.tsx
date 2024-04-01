import { useEffect, useState } from 'react';
import style from './detail.module.css';
import { useParams } from 'react-router-dom';

export function Detail() {
    const { cripto } = useParams();
    
    useEffect(() => {
        function getData() {
            fetch(``)
        }
    })

    return(
        <div>
            <h1>Pagina Detalhes {cripto}</h1>
        </div>
    )
}