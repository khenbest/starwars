export default class Starship {
    constructor(data) {
        this.name = data.name
        this.manufacturer = data.manufacturer
        this.cost = data.cost_in_credits || data.cost
        this.hyper = data.hyperdrive_rating || data.hyper
        this.class = data.starship_class || data.class
        this.url = data.url
    }
    get BasicTemplate() {
        return `<li onclick="app.controllers.ssController.getShip('${this.url}')" class="${this.cost}">${this.name}</li>`
    }
    get DetailedTemplate() {
        return `<div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="./app/assets/${this.name}.jpg" class="card-img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h1 class="card-title">${this.name}</h1>
        <h4 class="card-text">${this.manufacturer}</h4>
        <h6 class="card-text">Starship Class: ${this.class}</h6>
        <h6 class="card-text">Hyperdrive Rating: ${this.hyper}</h6>
        <h6 class="card-text">Credits To Purchase: ${this.cost}</h6>
      </div>
    </div>
  </div>
</div>
        `

    }
}
