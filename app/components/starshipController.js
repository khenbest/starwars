import StarshipService from "./starshipService.js";

let _ssService = new StarshipService()

function drawStarships() {
    let starships = _ssService.Starships
    let template = ''
    starships.forEach(p => {
        template += p.BasicTemplate
    })

    document.getElementById('ss').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_ssService.Previous ? '' : 'disabled'} onclick="app.controllers.ssController.getShips('${_ssService.Previous}')">Previous</button>
    <button ${_ssService.Next ? '' : 'disabled'} onclick="app.controllers.ssController.getShips('${_ssService.Next}')">Next</button>
    `
}
function drawActiveStarship() {
    document.getElementById('active-ss').innerHTML = _ssService.ActiveStarship.DetailedTemplate
}

export default class StarshipController {
    constructor() {
        _ssService.addSubscriber('starships', drawStarships)
        _ssService.addSubscriber('activeStarship', drawActiveStarship)

        this.getShips()
    }
    getShips(url) {
        _ssService.getAllApiStarships(url)

    }
    getShip(url) {
        _ssService.getOneApiStarship(url)
    }
}