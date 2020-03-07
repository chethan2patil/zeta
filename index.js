var categories = [];
var recipes = [];
// onload function 
function onLoadHandler() {
    fetch('http://temp.dash.zeta.in/food.php')
        .then(response => {
            console.log(response.categories);
            return response.json();
        })
        .then(function (data) {
            categories = data.categories;
            recipes = data.recipes;
            createCategory(categories, recipes);
            return categories;
        })
};

function createCategory(categoriesList, recipesList) {

    const categoriesElement = document.getElementById("categoriesDivId");
    const recipesListDiv = document.getElementById("recipesList");

    // categories view
    for (let i = 0; i < categoriesList.length; i++) {
        let aElement = document.createElement("a");
        aElement.className = "categoriesDiv";
        aElement.id = categoriesList[i].name;
        aElement.innerText = categoriesList[i].name;
        categoriesElement.appendChild(aElement);
    }

    //recipesList view
    let ulElement = document.createElement("ul");
    ulElement.className = "recipesUl"
    for (let i = 0; i < recipesList.length; i++) {

        let liElement = document.createElement("li");

        let imageNode = document.createElement("img");
        imageNode.src = recipesList[i].image;
        imageNode.id = "recipesImage";
        imageNode.className = recipesList[i].category;
        liElement.appendChild(imageNode);
        let titleNode = document.createElement("p");
        titleNode.innerHTML = recipesList[i].name;
        titleNode.className = "categoryName";
        liElement.appendChild(titleNode);
        let spanCartNode = document.createElement("span");
        let addToCart = document.createElement("button");
        addToCart.className = "waves-effect waves-light btn-small";
        addToCart.innerHTML = "ADD TO BAG";
        spanCartNode.appendChild(addToCart);
        titleNode.appendChild(spanCartNode);
        let priceNode = document.createElement("p");
        priceNode.innerHTML = "&#x20b9;" + recipesList[i].price;
        liElement.appendChild(priceNode);
        ulElement.appendChild(liElement);
    }
    recipesListDiv.appendChild(ulElement);

    //recipesList in card
    const cardDiv = document.getElementById("card");

    for (let i = 0; i < recipesList.length; i++) {

        let colDivCard = document.createElement("div");
        colDivCard.className = "col s3"
        let divCard = document.createElement("div");
        divCard.className = "card";
        let divElementCard = document.createElement("div");
        divElementCard.className = "card-image";
        let cardImage = document.createElement("img");
        cardImage.src = recipesList[i].image;
        cardImage.className = recipesList[i].category;
        let cardSpan = document.createElement("span");
        cardSpan.innerHTML = recipesList[i].name;
        let cardANode = document.createElement("a");
        cardANode.className = "btn-floating halfway-fab waves-effect waves-light red";
        let iCardNode = document.createElement("i");
        iCardNode.className = "material-icons";
        iCardNode.innerHTML = "add";
        divElementCard.appendChild(cardImage);
        divElementCard.appendChild(cardSpan);
        divElementCard.appendChild(cardANode);
        cardANode.appendChild(iCardNode);

        divCard.appendChild(divElementCard);
        colDivCard.appendChild(divCard);
        cardDiv.appendChild(colDivCard);
        
        let divSecondElementCard = document.createElement("div");
        divSecondElementCard.className = "card-content";
        let titleNode = document.createElement("p");
        titleNode.innerHTML = recipesList[i].details;

        divSecondElementCard.appendChild(titleNode);
        divCard.appendChild(divSecondElementCard);

    }

}