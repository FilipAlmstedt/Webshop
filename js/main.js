class Product {
    constructor(id, image, name, height, price, inCart) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.height = height;
        this.price = price;
        this.inCart = inCart;
    }
}

let container = $("<div>");
container.attr("class", "shoppingCartContainer");
let totalPrice = 0;

let shoppingCart = [];

$(function() {
    let p1 = new Product("elise", "css/images/gran1.png", "Elise", "Toppengran verkligen", 500, 1);
    shoppingCart.push(p1);

    $(".toggle").on("click",openMobileNavbar);

    modifyShoppingCart();

    container.appendTo($("#shoppingCartWindow"));

    checkShoppingCart();
    $("#shoppingCartWindowButton").on("click", openShoppingCartWindow);
});

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
        position: {
            my: "right top",
            at: "center",
            of: "#welcomeSectionContainer"
        },
        minWidth: 400,
        minHeight: 100,
        title: "Varukorg",
        modal: true,
        resizable: false

    });
}

/* Ifall listan innehåller någon vara så skapas element och visas på skärmen */
function showAndRefreshShoppingCartItems(){
    /* Rensar containern varje gång funktionen anropas */
    container.html("");

    $.each(shoppingCart, (i, item) => {
        /* Kollar bara så att denna del skrivs ut i början när första produkten i listan körs. Annars skulle den skrivas ut igen */
        if(i == 0){
            /*Div som visar en sektion med titlar. Under dem ska allt det som titlarna är, visas*/
            let titleDiv = $("<div>").attr("class","shoppingCartTitles");
            $("<p>").html("Produkt").appendTo(titleDiv);
            $("<p>").html("Antal").appendTo(titleDiv);
            $("<p>").html("Pris").appendTo(titleDiv); 
            titleDiv.appendTo(container);

            /* Horisontellt streck för att skilja sektioner */
            $("<hr>").appendTo(container);
        }

        /* Div som visar produkten som ligger i varukorgen */
        let showItems = $("<div>").attr("class","shoppingCartItemDiv");
            /* Sub-div skapas för snyggare styling */
            let nameAndImageDiv = $("<div>").attr("class","nameAndImageSection");
            $("<img>").attr("src", item.image).appendTo(nameAndImageDiv);
            $("<h4>").html(item.name).appendTo(nameAndImageDiv);
            nameAndImageDiv.appendTo(showItems);

            let addOrRemoveSameItem = $("<div>").attr("class", "countDiv");
            $("<p>").html("-").attr("id","removeSameItem").appendTo(addOrRemoveSameItem);
            $("<p>").attr("id","itemCount").html(item.inCart).appendTo(addOrRemoveSameItem);
            $("<p>").html("+").attr("id","addSameItem").appendTo(addOrRemoveSameItem);
            addOrRemoveSameItem.appendTo(showItems);

            let showPriceDiv = $("<div>").attr("class", "priceDiv");
            $("<p>").html(item.price + " kr").appendTo(showPriceDiv);
            /*Addera priset till det totala priset*/ 
            totalPrice += item.price;
            $("<a>").attr("class", "trashicon fas fa-trash-alt").attr("id", "removeItemFromShoppingCart").appendTo(showPriceDiv);
            showPriceDiv.appendTo(showItems);
        showItems.appendTo(container);

        $("<hr>").appendTo(container);

        /* Dessa div:ar ska endast visas när alla produkter har gått igenom loopen. if-satsen kollar när sista produkten har kommit, då skrivas dessa div:ar ut */
        if(shoppingCart.length-1 == i){
            /* Div som visar det totala priset */
            let totalPriceDiv = $("<div>").attr("class","shoppingCartTotalPriceDiv");
            $("<h4>").html("Total Summa: " + totalPrice + " kr").appendTo(totalPriceDiv);
            totalPriceDiv.appendTo(container);

            $("<hr>").appendTo(container);

            /* Div med knappar som leder till kassasidan eller att man tömmer varukorgen */
            let buttonDivs = $("<div>").attr("class","shoppingCartButtonDiv");
            $("<a>").attr("href","html/checkout.html").html("<button>Till kassan</button>").appendTo(buttonDivs);
            $("<button>").html("Töm varukorgen").appendTo(buttonDivs);
            buttonDivs.appendTo(container);
        } else {
            console.log("Continue loop!");
        }

    });
}

/* Kollar varukorgslistan. Ifall den är tom skriver rutan ut att varukorgen är tom, annars så anropar den funktionen showShoppingCartItems */
function checkShoppingCart(){
    if(shoppingCart.length == 0){
        $("#shoppingCartWindow").html("<p>Din varukorg är just nu tom!</p>");
        console.log(shoppingCart.length);
    } else {
        showAndRefreshShoppingCartItems();
    }
}