let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyURL = "http://localhost:3000/toys"
  const toyCollection = document.getElementById("toy-collection")
  const newToyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  function increaseLikes(toy)
  {
    return fetch(`${toyURL}/${toy.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    }).then(responce => responce.json())
  }

  function renderToy(toy)
  {
    const card = document.createElement("div")
    card.className = "card" 
    const name = document.createElement("h2")
    name.innerText = toy.name
    const image = document.createElement("img")
    image.className = "toy-avatar"
    image.src = toy.image
    const likes = document.createElement("p")
    likes.innerText = `${toy.likes} likes`
    const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    
    button.addEventListener("click", () => {
      increaseLikes(toy)
      .then(newToy => {
        toy.likes = newToy.likes
        likes.innerText = `${toy.likes} likes`
      })
    })

    card.append(name, image, likes, button)
    
    toyCollection.append(card)
  }

  function renderToys(toys)
  {
    toys.forEach(toy => renderToy(toy))
  }

  newToyForm.addEventListener("submit", e => {
    e.preventDefault()

    const newToy = {
      name: newToyForm.name.value,
      image: newToyForm.image.value,
      likes: 0
    }
    fetch(toyURL, {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(responce => responce.json())
    .then(toy => renderToy(toy))
    newToyForm.reset()
  })
  
  
  fetch(toyURL).then(responce => responce.json()).then(toys => renderToys(toys))
  
});
