class Product {
    constructor(image, name, height, price, inCart) {
        this.id = x++;
        this.image = image;
        this.name = name;
        this.height = height;
        this.price = price;
        this.inCart = inCart;
    }
}

let x = 1;
let shoppingCartContainer = $("<div>");
shoppingCartContainer.attr("class", "shoppingCartContainer");
let totalPrice = 0;
let shoppingCart = [];

let p1 = new Product('../css/images/gran1.jpg', "Elise", 200, 500, 0);
let p2 = new Product('../css/images/gran2.png', "Kristoffer", 100, 150, 0);
let p3 = new Product('../css/images/gran3.png', "Ivan", 250, 650, 0);
let p4 = new Product('../css/images/gran4.png', "Lydia", 70, 350, 0);
let p5 = new Product('../css/images/gran5.png', "Vera", 50, 200, 0);
let p6 = new Product('../css/images/gran6.png', "Jan", 300, 800, 0);

let products = [p1, p2, p3, p4, p5, p6];

$(function() {

    $(".toggle").on("click",openMobileNavbar);

    shoppingCartContainer.appendTo($("#shoppingCartWindow"));

    checkShoppingCart();

    $("#shoppingCartWindowButton").on("click", openShoppingCartWindow);

    printProducts();
    
    createCheckoutHtml();

    printProducts();
});


// All products showing in main
function printProducts() {
    $.each(products, (i, product) => {
        let container = $("#productlist");
        let listitem = $("<li>");
      
        $("<img>").addClass("image").attr('src', product.image).appendTo(listitem);
        $("<p>").html(product.price + "kr").addClass("price").appendTo(listitem);
        $("<p>").html(product.name).addClass("name").appendTo(listitem);
        $("<p>").addClass("fas fa-shopping-cart").attr("id","addToShoppingCart"+product.id).appendTo(listitem);

        listitem.appendTo(container);
        container.appendTo($(".main"));
        
    });

    $.each(products, (i, product) => {
        $("#addToShoppingCart"+product.id).on("click",{chosenProduct: product},addItemToShoppingCart);
    });
}


function createCheckoutHtml () {
    $('.shoppingCart').html('');

    for (let i = 0; i < shoppingCart.length; i++) {

        // get container - add divs
        let productDiv = $('<div>').addClass('productDiv').appendTo($('.shoppingCart'));
        let productImage = $('<img>').addClass('productImageCheckout').attr('src', shoppingCart[i].image).appendTo(productDiv);
        let containerInfoAmount = $('<div>').addClass('containerInfoAmount').appendTo(productDiv);
        let productInfo = $('<div>').addClass('productInfo').appendTo(containerInfoAmount);        
        let productAmount = $('<div>').addClass('productAmount').appendTo(containerInfoAmount);  

        // add product info - name, height, price
        $('<p>').addClass('productName').html(shoppingCart[i].name).appendTo(productInfo);                
        $('<p>').addClass('productHeight').html(shoppingCart[i].height + ' cm').appendTo(productInfo);                
        $('<p>').addClass('productPrice').html(shoppingCart[i].price + ' SEK').appendTo(productInfo);  
                
        // add buttons + amount p tag
        $('<button>').addClass('productButton').html('-').appendTo(productAmount).on('click', ()=> {subtractProductAmount(shoppingCart[i])});
        $('<p>').html(shoppingCart[i].inCart).appendTo(productAmount);
        $('<button>').addClass('productButton').html('+').appendTo(productAmount).on('click', ()=> {addProductAmount(shoppingCart[i])});
    }

    $('.totalPriceP').html("Totalt: " + totalPrice + " SEK");

    // if cart is empty
    if (shoppingCart.length == 0) {
        $('<h4>').html('Din varukorg är tom').addClass('emptyCheckoutCart').appendTo($('.shoppingCart'));

        $('#confirmPurchaseLink').attr("href", "#");
    }
}

// subtract products
function subtractProductAmount (product){
    product.inCart--
    totalPrice -= product.price;

    // splice product if amount = 0
    if (product.inCart === 0) {
        for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].id == product.id) {
                shoppingCart.splice(i, 1);
            }
        }
    };

    createCheckoutHtml(); 
};

// add products
function addProductAmount (product){
    product.inCart++
    totalPrice += product.price;
    createCheckoutHtml();
};

/*Aktiverar klassen active i css som gör att navbar visas vertikalt i mobilen*/ 
function openMobileNavbar(){
    if ($(".item").hasClass("active")) {
        $(".item").removeClass("active");
    } 
    else {
        $(".item").addClass("active");
    }
}

/*Öppnar varukorgsfönster*/ 
function openShoppingCartWindow(){
    $("#shoppingCartWindow").dialog("open");
}

/* Positionerar och anger hur stor den ska vara */
function modifyShoppingCart(){
    /*Gör fönstret responsivt, ger ut hela window-längden och uppdaterar den ifall den minskar*/ 
    $(window).resize(function() {
        getResponsivePosition($(window).width());
    });

    $("#shoppingCartWindow").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000       
        },
        hide: {
            effect: "blind",
            duration: 1000
        },
        minWidth: 350,
        minHeight: 100,
        title: "Varukorg",
        modal: true,
        resizable: false,
    });

    /* Default när man öppnar webbsidan */
    getResponsivePosition($(window).width());

    $.each(products, (i, product) => {
        $("#addToShoppingCart"+product.id).on("click",{chosenProduct: product},addItemToShoppingCart);
    });
    checkShoppingCart();
}

/* Kollar vilken längd hemsidafönstret har just nu. Ifall den är mindre än 769px så anpassar sig varukorgsfönstret för mobil/tablets istället */
function getResponsivePosition(windowWidth){
    console.log($(window).width());
    if(windowWidth > 769) {
        return $("#shoppingCartWindow").dialog({
            position: {
                my: "right top+60",
                at: "right top",
                of: "#wrapper"
            }
        });
    } else {
        return $("#shoppingCartWindow").dialog({
            position: {
                my: "center top+250",
                at: "center top",
                of: "#wrapper"
            }
        });
    }
}


/* Ifall listan innehåller någon vara så skapas element och visas på skärmen */
function showAndRefreshShoppingCartItems(){
    /* Rensar containern varje gång funktionen anropas */
    shoppingCartContainer.html("");

    $.each(shoppingCart, (i, item) => {
        /* Kollar bara så att denna del skrivs ut i början när första produkten i listan körs. Annars skulle den skrivas ut igen */
        if(i == 0){
            /*Div som visar en sektion med titlar. Under dem ska allt det som titlarna är, visas*/
            let titleDiv = $("<div>").attr("class","shoppingCartTitles");
            $("<p>").html("Produkt").appendTo(titleDiv);
            $("<p>").html("Antal").appendTo(titleDiv);
            $("<p>").html("Pris").appendTo(titleDiv); 
            titleDiv.appendTo(shoppingCartContainer);

            /* Horisontellt streck för att skilja sektioner */
            $("<hr>").appendTo(shoppingCartContainer);
        }

        /* Div som visar produkten som ligger i varukorgen */
        let showItems = $("<div>").attr("class","shoppingCartItemDiv");
            /* Sub-div skapas för snyggare styling */
            let nameAndImageDiv = $("<div>").attr("class","nameAndImageSection");
            $("<img>").attr("src", item.image).appendTo(nameAndImageDiv);
            $("<h4>").html(item.name).appendTo(nameAndImageDiv);
            nameAndImageDiv.appendTo(showItems);

            let addOrRemoveSameItem = $("<div>").attr("class", "countDiv");
            $("<p>").html("-").attr("id","removeSameItem"+item.id).attr("class", "addOrRemoveIcons").appendTo(addOrRemoveSameItem);
            $("<p>").attr("id","itemCount").html(item.inCart).appendTo(addOrRemoveSameItem);
            $("<p>").html("+").attr("id","addSameItem"+item.id).attr("class", "addOrRemoveIcons").appendTo(addOrRemoveSameItem);
            addOrRemoveSameItem.appendTo(showItems);

            let showPriceDiv = $("<div>").attr("class", "priceDiv");
            $("<p>").html(item.price + " kr").appendTo(showPriceDiv);
            $("<a>").attr("class", "trashicon fas fa-trash-alt").attr("id", "removeItemFromShoppingCart"+item.id).appendTo(showPriceDiv);
            showPriceDiv.appendTo(showItems);
        showItems.appendTo(shoppingCartContainer);

        $("<hr>").appendTo(shoppingCartContainer);

        /* Dessa div:ar ska endast visas när alla produkter har gått igenom loopen. if-satsen kollar när sista produkten har kommit, då skrivas dessa div:ar ut */
        if(shoppingCart.length-1 == i){
            /* Div som visar det totala priset */
            let totalPriceDiv = $("<div>").attr("class","shoppingCartTotalPriceDiv");
            $("<h4>").html("Total Summa: " + totalPrice + " kr").appendTo(totalPriceDiv);
            totalPriceDiv.appendTo(shoppingCartContainer);

            $("<hr>").appendTo(shoppingCartContainer);

            /* Div med knappar som leder till kassasidan eller att man tömmer varukorgen */
            let buttonDivs = $("<div>").attr("class","shoppingCartButtonDiv");
            $("<button>").attr("class","shoppingCartButtons").html("<a href='html/checkout.html' id='goToCheckout'>Till kassan</a>").appendTo(buttonDivs);
            $("<button>").html("Töm varukorgen").attr("id", "emptyShoppingCart").attr("class","shoppingCartButtons").appendTo(buttonDivs);
            buttonDivs.appendTo(shoppingCartContainer);
        } else {
            console.log("Continue loop!");
        }

    });

    /* Eventlistners för att "saker som man kan trycka på, För att sklija på dem läggs varans id till på elementets klass så man skiljer dem åt */
    $.each(shoppingCart, (i, item) => {
        $("#addSameItem"+item.id).on("click",{sameItem: item},addSameItemToCart);
        $("#removeSameItem"+item.id).on("click",{sameItem: item},removeSameItemToCart);
        $("#emptyShoppingCart").on("click",emptyShoppingCart);
        $("#removeItemFromShoppingCart"+item.id).on("click",{removeThisItem: item},removeItem);
    });
}

/* Kollar varukorgslistan. Ifall den är tom skriver rutan ut att varukorgen är tom, annars så anropar den funktionen showAndRefreshShoppingCartItems och skriver ut alla varor i listan */
function checkShoppingCart(){
    if(shoppingCart.length == 0){
        shoppingCartContainer.html("<p>Din varukorg är just nu tom!</p>");
        shoppingCartContainer.appendTo($("shoppingCartWindow"));
        console.log("Antal varor i varukorgen: ",shoppingCart.length);
    } else {
        showAndRefreshShoppingCartItems();
    }
}

/* Funktion som adderar samma vara till varukorgen */
function addSameItemToCart(e){
    e.data.sameItem.inCart++;
    totalPrice += e.data.sameItem.price; 
    console.log(e.data.sameItem.price);

    checkShoppingCart();   
}

/* Funktion som tar bort samma vara i varukorgen */
function removeSameItemToCart(e){
    e.data.sameItem.inCart--;
    totalPrice -= e.data.sameItem.price;
    if(e.data.sameItem.inCart == 0){
        shoppingCart.splice(shoppingCart.indexOf(e.data.sameItem),1);
        checkShoppingCart(); 
    } else {
        checkShoppingCart(); 
    }
}

/* Tömmer hela varukorgen genom att tömma listan och stämmer det total priset till 0 */
function emptyShoppingCart(){
    shoppingCart.splice(0,shoppingCart.length);
    totalPrice = 0;
    checkShoppingCart();
}

/* Ta bort en vara i varukorgen genom att leta upp varan i listan och tar bort dem därifrån */
function removeItem(e){
    console.log("You removed: " + e.data.removeThisItem.name, "Total Pris: ", totalPrice);

    totalPrice -= (e.data.removeThisItem.price*e.data.removeThisItem.inCart);

    shoppingCart.splice(shoppingCart.indexOf(e.data.removeThisItem),1);

    console.log("Nuvarande totalpris: ",totalPrice);

    checkShoppingCart();
}

function createShowProductDiv(e){

    $("#showProductDiv").html("");

    let itemTitleAndImageDiv = $("<div>").attr("class", "itemTitleAndImageDiv");
    $("<img>").attr("src", e.data.chosenProduct.image).appendTo(itemTitleAndImageDiv);
    itemTitleAndImageDiv.appendTo($("#showProductDiv"));

    let descriptionsAndPriceDiv = $("<div>").attr("class", "descriptionsAndPriceDiv");
    $("<h1>").html(e.data.chosenProduct.title).appendTo(descriptionsAndPriceDiv);
    $("<p>").html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan imperdiet nisl, et aliquam ligula luctus id. Nullam ut gravida tellus, id finibus lacus.").appendTo(descriptionsAndPriceDiv);
    $("<h2>").html("Pris: " + e.data.chosenProduct.price +" kr").appendTo(descriptionsAndPriceDiv);
    $("<button>").attr("id", "addToShoppingCart").html("Lägg till i varukorgen").appendTo(descriptionsAndPriceDiv);
    descriptionsAndPriceDiv.appendTo($("#showProductDiv"));

    $("#addToShoppingCartOnProductSite").on("click",addItemToShoppingCart(e.data.chosenProduct));
}

function addItemToShoppingCart(e){
    e.data.chosenProduct.inCart++;
    if(e.data.chosenProduct.inCart == 1){
        shoppingCart.push(e.data.chosenProduct);
        console.log("Du la till produkten: ", e.data.chosenProduct.name);
        totalPrice += e.data.chosenProduct.price; 
        checkShoppingCart();
        $("#shoppingCartWindowButton").on("click", openShoppingCartWindow);
    } else {
        totalPrice += e.data.chosenProduct.price;
        checkShoppingCart();
        $("#shoppingCartWindowButton").on("click", openShoppingCartWindow);
    }
}