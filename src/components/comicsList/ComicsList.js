import './comicsList.css';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const ComicsList = () => {
 
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(210)
    const MarvelService = useMarvelService()

    
    useEffect(() => {
        const fetchComics = async () =>{
            const comicsData = await MarvelService.getAllComics(offset);
            setComics(comics => [...comics, ...comicsData]);
        }
        fetchComics()
    }, [offset]) 

    
    return (
        <div className="comics__list">
            <ul className="comics__grid">


                {comics.map(char => (
                    <li key={char.id} className="comics__item">
                        <Link to={`/comics/${char.id}`}>
                            <img src={char.jpg} alt={char.title} className="comics__item-img" />
                            <div className="comics__item-name">{char.title}</div>
                            <div className="comics__item-price">{char.prices}</div>
                        </Link>
                        
                    </li>
                ))}
                
            </ul>
            <button className="button button__main button__long"
            onClick={() => setOffset(offset => offset + 8)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;