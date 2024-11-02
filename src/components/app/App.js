import AppHeader from "../appHeader/AppHeader";
import ComicsList from "../comicsList/ComicsList";
import useMarvelService from "../../services/MarvelService";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SingleComicPage from "../page/SingelComicsPage";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Page404 from "../page/404";
import decoration from '../../resources/img/vision.png';


const App = () => {
    
    





    const [selectedChar, setSelectedChar] = useState(null)
    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    
    return (
        <Router>

            <div className="app">
                <AppHeader/>

                <main>
                    <Routes>
                        
                        <Route path="/comics" element={
                            <>
                                <ComicsList/>
                            </>
                        }/>
                        <Route path="/comics/:comicId" element={
                            <>
                                <SingleComicPage/>
                            </>
                        }/>
                            

                        <Route path="/"  element={
                            <>
                                <ErrorBoundary>
                                    <RandomChar/>
                                </ErrorBoundary>
                                <div className="char__content">
                                    <ErrorBoundary>
                                        <CharList onCharSelected={onCharSelected}/>
                                    </ErrorBoundary>
                                    <ErrorBoundary>
                                        <CharInfo charId={selectedChar}/>
                                    </ErrorBoundary>
                                    
                                </div>
                                <img className="bg-decoration" src={decoration} alt="vision"/>
                            </>
                        }/>
                        <Route path="*" element={
                            <>
                                <Page404/>
                            </>
                        }/>

                    </Routes>
                    
                    
                    
                </main>
                
            </div>
        </Router>
    )
    
}

export default App;