var categories = [];
var recipes = [];

!async function () {
    await fetch("http://temp.dash.zeta.in/food.php")
        .then((response) => response.json())
        .then(data => {
            categories = data.categories;
            recipes = data.recipes;
            createFavorites(recipes);
            createCategory(categories);
            createRecipesList(recipes);
            document.getElementById("RecipeView").className = "hidden";
            document.getElementById("HomeView").className = "";
        })
        .catch(error => {
            console.error(error);
        });
}();

let timeout = null;
function searchRecipes() {
    // delay one sec before search such that wont have to make autocomplete every key stroke
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        let inputValue = document.getElementById("autocomplete-input").value;
        var searchTerm = inputValue;
        console.log(inputValue);
        let matchedTerms = [];
        searchTerm = searchTerm.toLowerCase();
        console.log("recipes", recipes)
        matchedTerms = recipes.filter(function (i) {
            return (i.name.toLowerCase().indexOf(searchTerm) > -1);
        });
        createRecipesList(matchedTerms);
    }, 1000);
}

function createCategory(categoriesList) {
    const categoriesElement = document.getElementById("CategoriesDivId");
    categoriesList.unshift({
        name: "All",
        image: ""
    });
    // categories view
    for (let i = 0; i < categoriesList.length; i++) {
        let aElement = document.createElement("a");
        if (i == 0) {
            aElement.className = "categories-a active";
        } else {
            aElement.className = "categories-a";
        }
        aElement.onclick = function () {
            Array.from(document.getElementById("CategoriesDivId").children).forEach(function (elem) {
                elem.classList.remove("active");
            })
            this.className = "categories-a active";
            filterCategory(recipes, categoriesList[i].name);
        }
        let categoryElement = document.createElement("div");
        categoryElement.className = "category";
        let imgElement = document.createElement("img");
        imgElement.src = categoriesList[i].image;
        let textElement = document.createElement("div");
        textElement.innerText = categoriesList[i].name;
        categoryElement.appendChild(imgElement);
        categoryElement.appendChild(textElement);
        aElement.appendChild(categoryElement);
        categoriesElement.appendChild(aElement);
    }
}

function createFavorites(recipesList) {
    let favRecipeList = recipesList.filter((recipe) => recipe.isFavourite);
    let recipesListElement = createRecipeCard(favRecipeList, "favourite");
    const recipesListDiv = document.getElementById("FavRecipesList");
    recipesListDiv.appendChild(recipesListElement);
}


function filterCategory(recipesList, filterType) {
    document.getElementById("recipesList").innerHTML = "";
    let filteredRecipeList;
    if (filterType == "All") {
        filteredRecipeList = recipesList;
    } else {
        filteredRecipeList = recipesList.filter((recipe) => recipe.category == filterType);
    }
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        const recipesListDiv = document.getElementById("recipesList");
        let recipesListElement;
        if (filteredRecipeList.length <= 0) {
            recipesListElement = document.createElement("div");
            recipesListElement.className = "no-dish";
            recipesListElement.innerHTML = "NO DISH";
        } else {
            recipesListElement = createRecipeCard(filteredRecipeList, "category");
        }
        recipesListDiv.appendChild(recipesListElement);
    }, 500);
}

function createRecipesList(recipesList) {
    document.getElementById("recipesList").innerHTML = "";
    const recipesListDiv = document.getElementById("recipesList");
    let recipesListElement;
    if (recipesList.length <= 0) {
        recipesListElement = document.createElement("div");
        recipesListElement.className = "no-dish";
        recipesListElement.innerHTML = "NO DISH";
    } else {
        recipesListElement = createRecipeCard(recipesList, "category");
    }
    recipesListDiv.appendChild(recipesListElement);
}

function createRecipeCard(recipesList, recipeType) {
    let ulElement = document.createElement("ul");
    ulElement.className = "recipes-ul"
    for (let i = 0; i < recipesList.length; i++) {
        let liElement = document.createElement("li");
        liElement.onclick = function () {
            createRecipeCardDescription(recipesList, recipesList[i].name);
        }
        let imageNode = document.createElement("img");
        imageNode.src = recipesList[i].image;
        imageNode.id = "recipesImage";
        imageNode.className = recipesList[i].category;
        liElement.appendChild(imageNode);
        let descriptionNode = document.createElement("div");
        descriptionNode.className = "description";

        let descriptionRightNode = document.createElement("div");
        let titleNode = document.createElement("h4");
        titleNode.innerHTML = recipesList[i].name;
        titleNode.className = "category-name";
        descriptionRightNode.appendChild(titleNode);
        let priceNode = document.createElement("div");
        priceNode.className = "price";
        priceNode.innerHTML = "&#x20b9;" + recipesList[i].price;
        descriptionRightNode.appendChild(priceNode);

        let descriptionLeftNode = document.createElement("div");
        let addToCart = document.createElement("button");
        addToCart.className = "add-to-cart";
        if (recipeType == "favourite") {
            addToCart.innerHTML = "REORDER";
        } else {
            addToCart.innerHTML = "ADD TO BAG";
        }

        descriptionLeftNode.appendChild(addToCart);

        descriptionNode.appendChild(descriptionRightNode);
        descriptionNode.appendChild(descriptionLeftNode);
        liElement.appendChild(descriptionNode);
        ulElement.appendChild(liElement);
    }
    return ulElement;
};

function createRecipeCardDescription(recipesOriginalList, recipeName) {
    document.getElementById("HomeView").className = "hidden";
    document.getElementById("RecipeView").className = "";
    document.getElementById("RecipeDiv").innerHTML = "";
    let recipesList = recipesOriginalList.filter((recipe) => recipe.name == recipeName);
    let divElement = document.createElement("div");
    divElement.className = "description-box";
    let imageNode = document.createElement("img");
    imageNode.src = recipesList[0].image;
    imageNode.id = "recipesImage";
    imageNode.className = recipesList[0].category;
    divElement.appendChild(imageNode);
    let descriptionNode = document.createElement("div");
    descriptionNode.className = "description";

    let ratingNode = document.createElement("div");
    ratingNode.className = "rating";
    let descriptionRightNode = document.createElement("div");
    let titleNode = document.createElement("h4");
    titleNode.innerHTML = recipesList[0].name;
    titleNode.className = "category-name";
    descriptionRightNode.appendChild(titleNode);
    let priceNode = document.createElement("div");
    priceNode.className = "price";
    priceNode.innerHTML = "&#x20b9;" + recipesList[0].price;
    descriptionRightNode.appendChild(priceNode);

    let descriptionLeftNode = document.createElement("div");
    let addToCart = document.createElement("button");
    addToCart.className = "add-to-cart";

    addToCart.innerHTML = "ADD TO BAG";


    descriptionLeftNode.appendChild(addToCart);

    let recipesDivNode = document.createElement("div");
    let recipesTitleNode = document.createElement("h4");
    recipesTitleNode.innerHTML = "Category:" + " " + recipesList[0].category;
    recipesTitleNode.className = "category-name";
    recipesDivNode.appendChild(recipesTitleNode);

    let descriptionRatingNode = document.createElement("div");
    let titleRatingNode = document.createElement("h4");

    titleRatingNode.innerHTML = "&#11088;" + recipesList[0].rating + ".0" + " Ratings," + "  " + "(" + recipesList[0].reviews + "" + "Reviews)";

    descriptionRatingNode.appendChild(titleRatingNode);

    let detailsDivNode = document.createElement("div");
    detailsDivNode.className = "details";
    let detailsTitleNode = document.createElement("h4");
    let detailsContentNode = document.createElement("h4");
    detailsTitleNode.innerHTML = "DETAILS"
    detailsContentNode.innerHTML = recipesList[0].details;

    detailsDivNode.appendChild(detailsTitleNode);
    detailsDivNode.appendChild(detailsContentNode);

    descriptionLeftNode.appendChild(addToCart);

    descriptionNode.appendChild(descriptionRightNode);
    descriptionNode.appendChild(descriptionLeftNode);

    ratingNode.appendChild(recipesDivNode);
    ratingNode.appendChild(descriptionRatingNode);

    divElement.appendChild(descriptionNode);
    divElement.appendChild(ratingNode);
    divElement.appendChild(detailsDivNode);


    let buttonNode = document.createElement("button");
    buttonNode.className = "close-btn";
    buttonNode.innerHTML = "X"
    buttonNode.onclick = function(){
        document.getElementById("HomeView").className = "";
        document.getElementById("RecipeView").className = "hidden";
    }

    document.getElementById("RecipeDiv").appendChild(divElement);
    document.getElementById("RecipeDiv").appendChild(buttonNode);
};