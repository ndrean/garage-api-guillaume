// TODO: Build an awesome garage!

const baseUrl = "https://wagon-garage-api.herokuapp.com";
const carList = document.querySelector('.cars-list');
const form = document.getElementById('new-car');
const inputBrand = document.getElementById('brand');
const inputModel = document.getElementById('model');
const inputOwner = document.getElementById('owner');
const inputPlate = document.getElementById('plate');

const bindButtonsToDestruction = () => {
  const buttonsDelete = document.querySelectorAll('.delete');
  buttonsDelete.forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteCar(button.dataset.id);
    });
  });
};

const getAllCars = () => {
  carList.innerText = "";
  fetch(`${baseUrl}/334/cars`)
    .then(response => response.json())
    .then((data) => {
      // do something with the json
      console.log(data);
      data.forEach((car) => {
        const carCard = `<div class="car">
                      <div class="car-image">
                        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
                      </div>
                      <div class="car-info">
                        <h4>${car.brand} ${car.model}</h4>
                        <p><strong>Owner:</strong> ${car.owner}</p>
                        <p><strong>Plate:</strong> ${car.plate}</p>
                      </div>
                      <button class="delete" data-id="${car.id}">Delete</button>
                    </div>`;
        carList.insertAdjacentHTML('beforeend', carCard);
      });
      bindButtonsToDestruction();
    });
};

const deleteCar = (id) => {
  fetch(`${baseUrl}/cars/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      getAllCars();
    });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch(`${baseUrl}/334/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      brand: inputBrand.value,
      model: inputModel.value,
      owner: inputOwner.value,
      plate: inputPlate.value
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      getAllCars();
      form.reset();
    });
});

getAllCars();
