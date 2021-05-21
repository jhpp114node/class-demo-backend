console.log("Hello index.ejs");

const readDataBase = async () => {
  const destinationsFetch = await fetch("/destination");
  const destinationsResponse = await destinationsFetch.json();
  return destinationsResponse;
};

const createCards = async () => {
  const right_side_container = document.querySelector(
    ".right_side_outer_container"
  );
  const destinations = await readDataBase();

  destinations.forEach((eachData) => {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "card");
    outerDiv.setAttribute("style", "width: 17rem;");
    const imageTag = document.createElement("img");
    imageTag.setAttribute("class", "card-img-top");
    imageTag.setAttribute("src", eachData.photoURL);
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "card-body");
    const header5Tag = document.createElement("h5");
    header5Tag.setAttribute("class", "card-title");
    header5Tag.textContent = eachData.destination;
    const paragraphTag = document.createElement("p");
    paragraphTag.setAttribute("class", "card-text");
    paragraphTag.textContent = eachData.description;
    // buttons for div
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "button_container");
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "btn btn-info editBtn");
    editButton.setAttribute("uid", eachData.id);
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-danger deleteBtn");
    deleteButton.setAttribute("uid", eachData.id);
    deleteButton.textContent = "Delete";

    // append DOM elements
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    cardBodyDiv.appendChild(header5Tag);
    cardBodyDiv.appendChild(paragraphTag);
    cardBodyDiv.appendChild(buttonDiv);
    outerDiv.appendChild(imageTag);
    outerDiv.appendChild(cardBodyDiv);

    // append it to actual HTML DOM element
    right_side_container.appendChild(outerDiv);
  });
  // create outer div
};

createCards();
