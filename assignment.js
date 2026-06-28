// Q1: Load default
const loadAllProduct = (query) => {
    const searchQuery = query ? `s=${query}` : 'f=a';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
            displayProduct(data.drinks);
        });
};

// Q3: Drink cards (Name + Category + Inst + 2 Buttons)
const displayProduct = (drinks) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // clear old cards first

    // Q2: Show not found
    if (!drinks) {
        productContainer.innerHTML =
            '<h3 class="not-found-msg">Not found any search result</h3>';
        return;
    }

    drinks.forEach((drink) => {
        const div = document.createElement("div");
        div.classList.add("cart");

        div.innerHTML = `
            <img class="cart-img" src="${drink.strDrinkThumb}" alt="Drink Image" />
            <h3>${drink.strDrink}</h3>
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p> <strong>Inst:</strong> ${drink.strInstructions.slice(0, 25)}...</p>
            <button class="btn-add-group" onclick="handleAddToCart('${drink.strDrink}', '${drink.strDrinkThumb}', this)">Add to Cart</button>
            <button class="btn-details" onclick="singleProduct('${drink.idDrink}')">Details</button>
        `;

        productContainer.appendChild(div);
    });
};

// Q2: Search button 
const handleSearch = () => {
    const inputVal = document.getElementById("search-input").value;
    loadAllProduct(inputVal);
};

// Q5, Q6: Add to cart
const handleAddToCart = (name, imgUrl, btnElement) => {
    const cartCountStr = document.getElementById("count").innerText;
    let cnt = parseInt(cartCountStr);

    // Q6: Cannot add more than 7 drinks
    if (cnt >= 7) {
        alert("You cannot add more than 7 drinks to a group!");
        return;
    }

    // Increase the count 
    cnt += 1;
    document.getElementById("count").innerText = cnt;

    // Change the button text and disable it
    btnElement.innerText = "Already add in cart";
    btnElement.disabled = true;
    btnElement.style.backgroundColor = "gray";
    btnElement.style.cursor = "not-allowed";

    // Add the drink info
    const container = document.getElementById("cart-main-container");
    const div = document.createElement("div");
    div.classList.add("cart-info");

    div.innerHTML = `
        <p>${cnt}</p>
        <img class="cart-img-small" src="${imgUrl}" alt="${name}">
        <p>${name}</p>
    `;
    container.appendChild(div);
};

// Q7: Show details with 5 information
const singleProduct = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
            const drink = data.drinks[0];

            const modalDetails = document.getElementById("modal-details");

            // 5 info: Name, Image, Category, Type, Glass, Ing1, Ing2
            modalDetails.innerHTML = `
                <h2>${drink.strDrink}</h2>
                <img class="modal-img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
                <p><strong>Category:</strong> ${drink.strCategory}</p>
                <p><strong>Type:</strong> ${drink.strAlcoholic}</p>
                <p><strong>Glass:</strong> ${drink.strGlass}</p>
                <p><strong>Ingredient 1:</strong> ${drink.strIngredient1}</p>
                <p><strong>Ingredient 2:</strong> ${drink.strIngredient2}</p>
            `;

            // Show the modal
            document.getElementById("details-modal").style.display = "block";
        });
};

// Close modal
const closeModal = () => {
    document.getElementById("details-modal").style.display = "none";
};

// Q1: Run on page load
loadAllProduct();
