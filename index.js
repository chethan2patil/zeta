var categories = [];
var recipes = [];

!async function(){
    let data = await fetch("http://temp.dash.zeta.in/food.php")
        .then((response) => response.json())
        .then(data => {
             categories = data.categories;
            recipes = data.recipes;
            createCategory(categories);
            createRecipesList(recipes);
            return categories,recipes ;
        })
        .catch(error => {
            console.error(error);
        });
    
    console.log(recipes);    

    }();
console.log(recipes, categories); 
 function searchRecipes() {
    
    let inputValue = document.getElementById("autocomplete-input").value;
    var searchTerm = inputValue;
    console.log(inputValue);
    let matchedTerms = [];
    searchTerm = searchTerm.toLowerCase();
    // -----------------ans1--------------------
    matchedTerms = recipes.filter(function(i) {
        return i.name.toLowerCase().indexOf(searchTerm) > -1;
    });
    createRecipesList(matchedTerms);
 }

function createCategory(categoriesList) {

    const categoriesElement = document.getElementById("categoriesDivId");


    // categories view
    for (let i = 0; i < categoriesList.length; i++) {
       
        let icon = document.createElement("i");
        icon.className = "material-icons";
        icon.innerHTML = "cake";
        let aElement = document.createElement("a");
        aElement.className = "categoriesDiv";
        aElement.id = categoriesList[i].name;
        aElement.innerText = categoriesList[i].name;
        aElement.appendChild(icon);
        categoriesElement.appendChild(aElement);
       
    }
}
function createRecipesList (recipesList){
    const recipesListDiv = document.getElementById("recipesList");
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

 

}