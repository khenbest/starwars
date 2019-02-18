import StarshipController from "./components/starshipController.js";

class App {
    constructor() {
        this.controllers = {
            ssController: new StarshipController()
        }
    }
}

window['app'] = new App()