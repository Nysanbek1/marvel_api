import useHttp from "../components/hooks/http.hook";

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=0dee68bc4c4ed6ff2b9d95f4aeb54038';
    const _baseOffset = 210;
    const _comicsOffset = 210


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (char) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${char}&apikey=0dee68bc4c4ed6ff2b9d95f4aeb54038`);
        return res.data.results.map(char => {
            return {
                id: char.id,
                title: char.title,
                jpg: `${char.thumbnail.path}.${char.thumbnail.extension}`,
                prices: char.prices[0].price

            }
        })
    }

    const getComicsId = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return res.data.results[0]
    } 

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const _transformComics = (chars) => {
        return {
            name: chars.title,
            jpg: chars.images[0].path + chars.images[0].extension,
            description: chars.description,
            pageCount: chars.pageCount

            

        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComicsId}
}

export default useMarvelService;