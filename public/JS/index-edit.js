console.log("index Edit");
document
  .querySelector(".right_side_outer_container")
  .addEventListener("click", (event) => {
    // console.log(event.target);
    if (event.target.classList.contains("editBtn")) {
      editCardBehavior(event);
    } else if (event.target.classList.contains("deleteBtn")) {
      deleteCardBehavior(event);
    }
  });

async function editCardBehavior(event) {
  console.log(event.target);
  const edit_target_id = event.target.getAttribute("uid");
  // console.log(target_id);

  // retrieve data
  const userInputDestination = prompt("Enter destination");
  const userInputLocation = prompt("Enter location");
  const userInputDescription = prompt("Etner description");

  const data = {
    destination: userInputDestination,
    location: userInputLocation,
    description: userInputDescription,
  };

  fetch(`/destination/${edit_target_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      location.reload();
    })
    .catch((error) => console.log(error));
}

async function deleteCardBehavior(event) {
  const delete_target_id = event.target.getAttribute("uid");
  let userPrompt = prompt("please type word 'Delete' to conform your action");
  if (userPrompt === "Delete") {
    fetch(`/destination/${delete_target_id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else {
    alert("Delete confirm failed");
  }
}
