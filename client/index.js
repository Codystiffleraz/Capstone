const baseURL = 'http://localhost:1010'

const showDogs = document.querySelector('#dogDisplay')
const addButton = document.querySelector('#addDog')

// Axios request to get drinks array
//Loop over that array
// Another function to create dog cards for each item in the array 

const displayDogs = (arr) => {
    for(let i = 0; i < arr.length; i++){ 
        createDogCard(arr[i])
    }
}

const createDogCard =(dog) => {
    const dogCard = document.createElement('section')
    dogCard.classList.add('dog-card')
    
    dogCard.innerHTML =`
        <img src= ${dog.picture} />
        <p>${dog.name}</p>
        <p>${dog.description}</p>
        <section>
        <button onclick="updateDog(${dog.id}, 'dislike')">Dislike</button>
        Popularity: ${dog.likes}
        <button onclick="updateDog(${dog.id}, 'like')">Like</button>
        </section>
        <button onclick="deleteCats(${dog.id})">delete</button>
    `
    showDogs.appendChild(dogCard)
}

const getAllDogs = () => {
    axios.get(`${baseURL}/getDogs`)

    .then((res) => {
        displayDogs(res.data)
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteCats = (id) => {
    axios.delete(`${baseURL}/deleteCats/${id}`)
    .then((res) => {
        showDogs.innerHTML = ''
        displayDogs(res.data)
    })
}

const updateDog = (id, type) => {
    axios.put(`${baseURL}/updateLikes/${id}`, {type})
    .then((res) => {
        showDogs.innerHTML = ''
        displayDogs(res.data)
    })

}

const addDog = () =>{
    let nameInput = document.querySelector('#name')
    let descriptionInput = document.querySelector('#description')
    let pictureInput = document.querySelector('#picture')

    let newDog = {
        name: nameInput.value,
        description: descriptionInput.value,
        picture: pictureInput.value
    }

    axios.post(`${baseURL}/addDogs`, newDog)
    .then((res) => {
        showDogs.innerHTML = ''
        nameInput.value = ''
        descriptionInput.value =''
        pictureInput.value =''
        displayDogs(res.data)
    })
}
addButton.addEventListener('click' , addDog)

getAllDogs()