const prodPlace = document.querySelector("#cardContainer")

class ProdFeatures {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.imageUrl = _imageUrl
        this.price = _price
    }
}

const products = [
    new ProdFeatures("iPhone", "good phone", "Apple", "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg", "99"),
    new ProdFeatures("iPhone", "good phone 2", "Apple", "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg", "199"),
    new ProdFeatures("iPhone", "good phone 3", "Apple", "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg", "299"),
    new ProdFeatures("iPhone", "good phone 4", "Apple", "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg", "399"),
]

const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2ZmYxZmMwNTgzNTAwMTg1MjJjMjAiLCJpYXQiOjE3MDIzMDA5NTgsImV4cCI6MTcwMzUxMDU1OH0.JtSZUsCbC_9iWkdGkpDgJqZSXV2NYzJoH9Qu55_ZeV8"

Promise.all(products.map(product =>
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": apiKey
        },
        body: JSON.stringify(product),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
))
    .then(() => fetchProd())
    .catch(error => console.error("Error during product addition:", error))

function fetchProd() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "GET",
        headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => showProd(data))
    .catch(error => console.error("Error during fetching products:", error))
}

function showProd(products) {
    prodPlace.innerHTML = ''

    const row = document.createElement("div")
    row.classList.add("row")

    products.forEach(product => {
        const card = document.createElement("div")
        card.classList.add("card", "col-12", "col-md-6", "col-lg-4", "col-xl-3", "mb-3")

        const image = document.createElement("img")
        image.src = product.imageUrl
        image.alt = product.name
        image.classList.add("card-img-top", "img-fluid")
        card.appendChild(image)

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const title = document.createElement("h2")
        title.textContent = product.name
        title.classList.add("card-title")
        cardBody.appendChild(title)

        const brand = document.createElement("p")
        brand.textContent = `Brand: ${product.brand}`
        brand.classList.add("card-text")
        cardBody.appendChild(brand)

        const price = document.createElement("p")
        price.textContent = `Price: ${product.price} €`
        price.classList.add("card-text")
        cardBody.appendChild(price)

        const viewDetailButton = document.createElement("button")
        viewDetailButton.textContent = "More details"
        viewDetailButton.classList.add("btn", "btn-info", "mt-3")  
        cardBody.appendChild(viewDetailButton)

        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.classList.add("btn", "btn-primary", "mt-3")
        cardBody.appendChild(editButton)

        card.appendChild(cardBody)
        row.appendChild(card)
    })

    prodPlace.appendChild(row)
}

fetchProd()