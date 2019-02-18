import Starship from "../models/starship.js";



let _starshipApi = axios.create({
    baseURL: 'https://swapi.co/api/starships'
})

let _state = {
    starships: [],
    whichPage: {
        nextUrl: '',
        previousUrl: ''
    },
    activeStarship: {}
}

let _subscribers = {
    starships: [],
    whichPage: [],
    activeStarship: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
    _state[prop] = value
    _subscribers[prop].forEach(fn => fn());
}


export default class StarshipService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    //get local data
    get Starships() {
        //Breaks Refrences of each object in state
        return _state.starships.map(s => new Starship(s))
    }

    get Next() {
        return _state.whichPage.nextUrl
    }

    get Previous() {
        return _state.whichPage.previousUrl
    }

    get ActiveStarship() {
        //Creates a new object that is a copy of the active person (breaking refrence)
        return new Starship(_state.activeStarship)
    }

    getAllApiStarships(url = '') {
        _starshipApi.get(url)
            //Happens after data comes back
            .then(response => {
                //all axios requests return 'data' in the response
                let starships = response.data.results.map(s => new Starship(s))
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                setState('whichPage', urlData)
                setState('starships', starships)
            })
            .catch(err => {
                console.error(err)
            })
    }
    getOneApiStarship(url) {
        _starshipApi.get(url)
            .then(res => {
                setState('activeStarship', new Starship(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    }
}