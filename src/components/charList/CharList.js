import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.css';

const useHuk = (nach) => {
    const [lol, setLol] = useState(nach)


    const usecharList = (newCharList) => {
        setLol(lol => [...lol, ...newCharList])
    }

    const useOffset = () => {
        setLol(lol => lol + 9)
    }

    const useBool = (bool) => {
        setLol(bool)
    }

    return {lol, useBool, usecharList, useOffset}
}

const CharList = (props) => {

    const newItemLoadingHuk = useHuk(false)
    const charEndedHuk = useHuk(false)
    const charListHuk = useHuk([])
    const offsetHuk = useHuk(210)

    
    
    const marvelService =  useMarvelService();
    useEffect(() => {
        onRequest(offsetHuk.lol, true);
    }, [])
    

    const onRequest = (offset, init) => {
        init ? newItemLoadingHuk.useBool(false) : newItemLoadingHuk.useBool(true);
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        charListHuk.usecharList(newCharList)
        newItemLoadingHuk.useBool(false)
        offsetHuk.useOffset()
        charEndedHuk.useBool(ended)
        
    }

    

    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    
    const renderItems = (arr) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



        //const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        
        const items = renderItems(charListHuk.lol);

        const errorMessage = marvelService.error ? <ErrorMessage/> : null;
        const spinner = marvelService.loading && !newItemLoadingHuk.lol ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoadingHuk.lol}
                    style={{'display': charEndedHuk.lol ? 'none' : 'block'}}
                    onClick={() => onRequest(offsetHuk.lol)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;