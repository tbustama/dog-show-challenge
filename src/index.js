document.addEventListener("DOMContentLoaded", () => {
  fetchRegisteredDogs();
});

//make fetch request for dogs
function fetchRegisteredDogs() {
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((object) =>
      object.forEach((dog) => {
        renderDog(dog);
      })
    );
}

//render all dogs to the page
function renderDog(dog) {
  let form = document.getElementById("dog-form");
  form.reset();
  let button = document.createElement("button");
  let table = document.createElement("tr");
  table.id = dog.id;
  let name = document.createElement("td");
  let breed = document.createElement("td");
  let sex = document.createElement("td");
  let buttonData = document.createElement("td");
  name.innerText = dog.name;
  breed.innerText = dog.breed;
  sex.innerText = dog.sex;
  button.innerText = "Edit";
  button.addEventListener("click", () => {
    editBtn(dog);
  });
  buttonData.appendChild(button);
  table.append(name, breed, sex, buttonData);
  let dogTable = document.querySelector("#table-body");
  dogTable.append(table);
}

// change edit form to specific dog
function editBtn(dog) {
  let form = document.getElementById("dog-form");
  form.addEventListener("submit", (e) => {
    submitEdit(e, dog);
  });
}

// fetch patch on submit
function submitEdit(event, dog) {
  event.preventDefault();
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value,
    }),
  });
  let dogTable = document.querySelector("#table-body");
  dogTable.innerHTML = "";
  setTimeout(fetchRegisteredDogs, 10);
}
