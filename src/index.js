let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  const newToyForm = document.querySelector(".add-toy-form")

  const baseUrl = "http://localhost:3000";
  const toysUrl = baseUrl + "/toys"
  

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  const renderAllToys = toys => {
    toys.forEach(renderToyCard)
    
  }
  
  const fetchAllToys = () => {
    return fetch(toysUrl)
    .then( resp => resp.json())
  }
  
  //  fetch(toysUrl)
  //  .then(function(response){
    //    return response.json();
    //  })
    //  .then(function(json) {
      //   console.log(json)
      
      // })
      
      fetchAllToys().then(renderAllToys)

    const renderToyCard = (toy) => {
    
    const card = document.createElement("div")
    card.className = "card"
    
    const toyName = document.createElement("h2")
    toyName.innerText = toy.name
  
    const toyImage = document.createElement("img")
    toyImage.className = "toy-avatar"
    toyImage.src = toy.image

    const toyLikes = document.createElement("p")
    toyLikes.innerText = toy.likes + " Likes"

    const button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like"
    
    card.append(toyName, toyImage, toyLikes, button)
    toyCollection.append(card)
    
    button.addEventListener("click", () => {
     
      toy.likes++ 
        fetch(`${toysUrl}/${toy.id}`, {
          method: "PATCH",
          body: JSON.stringify({ likes: toy.likes }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        toyLikes.innerText = toy.likes
    } )
    
      
  }

  newToyForm.addEventListener("submit", (event) => {

    const toyNewName = event.target.name.value
    const toyNewImage = event.target.image.value

      fetch(toysUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyNewName,
          image: toyNewImage,
          likes: 0,
        })
      }).then(resp => resp.json())
      .then(renderToyCard)

  })


  
  






});
