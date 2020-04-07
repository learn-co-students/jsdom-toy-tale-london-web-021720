let addToy = false;

fetch("http://localhost:3000/toys") 
.then(response => response.json())
.then(renderToys => renderEachToy(renderToys))


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});


const postToy = toy =>
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json();
  });

const patchToy = toy =>
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(response => {
    return response.json();
});


function renderEachToy(toys) {
  toys.forEach(toy => {
    const toyCollection = document.querySelector("#toy-collection")
    const toyCard = document.createElement("div")
    const toyName = document.createElement("h2")
    const toyImage = document.createElement("img")
    const toyLikes = document.createElement("p")
    const toyLikeBtn = document.createElement("button")

    toyCard.className = "card"
    toyName.innerText = toy.name 
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    toyLikes.innerText = `${toy.likes} Likes`
    toyLikeBtn.className = "like-btn"
    toyLikeBtn.innerText = "Like <3"

    toyLikeBtn.addEventListener("click", () => {
      console.log("like this toy", toy);
  
      toy.likes++;
      toyLikeBtn.disabled = true;
  
      patchToy(toy).then(updatedToy => {
        toy.likes = updatedToy.likes;
  
        toyLikes.innerText = `Likes: ${toy.likes}`;
        toyLikeBtn.disabled = false;
      });
    });

    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(toyLikeBtn)

    toyCollection.appendChild(toyCard)
  });
}

const newToyForm = document.querySelector("form");

console.log(newToyForm);
newToyForm.addEventListener("submit", event => {
  event.preventDefault();

  const newToy = {
    name: newToyForm.name.value,
    image: newToyForm.image.value,
    likes: 0
  };

  postToy(newToy).then(newToyFromServer => {
    renderToy(newToyFromServer);
  });
});
