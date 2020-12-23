class Product {
    constructor(image, name, description, height, price, inCart) {
        this.id = x++;
        this.image = image;
        this.name = name;
        this.description = description;
        this.height = height;
        this.price = price;
        this.inCart = inCart;
    }
}

let x = 1;
let p1 = new Product('css/images/gran1.jpg', "Elise", "Elise är en mindre gran för dig som inte vill ha absolut största granen i huset. Passar att placera varsomhelst i ditt hus.",200, 100, 0);
let p2 = new Product('css/images/gran2.png', "Kristoffer", " Kristoffer är en standardgran som passar för alla hus. Denna gran är vår populäraste gran.",100, 350, 0);
let p3 = new Product('css/images/gran3.png', "Ivan", "För dig som vill ha lite extra för att göra julen så speciell som möjligt så är Ivan granen för dig. OBS! Julgranspyntet ingår inte", 250, 650, 0);
let p4 = new Product('css/images/gran4.png', "Lydia", "För dig som gå all-out så Lydia för mig. Vår största gran för dig som göra Julen riktigt speciell. OBS! Julgranspyntet ingår inte",70, 800, 0);
let p5 = new Product('css/images/gran5.png', "Vera", "En lite mindre gran för dig som inte har så mycket plats. Du får även allt julgranspynt som finns på bilden. Passa på nu!", 50, 250, 0);
let p6 = new Product('css/images/gran6.png', "Jan", "Denna gran är för dig som hellre vill ha en mindre gran som du kan placera på ett bord istället för en julgransfot. Denna är gjort av plast så man kan använda nästa år igen. Du får även allt julgranspynt som finns på bilden. Passa på nu!",300, 200, 0);

let products = [p1, p2, p3, p4, p5, p6];

let totalPriceFromLS = localStorage.getItem("totalPrice");
let totalPrice = JSON.parse(totalPriceFromLS);

let shoppingCartFromLS = localStorage.getItem("shoppingCart");
let shoppingCart = JSON.parse(shoppingCartFromLS);

$(function () {
    $(".toggle").on("click",openMobileNavbar);

    createCheckoutHtml();
    console.log("hej");
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
s

function createCheckoutHtml () {
    $('.shoppingCart').html('');

    for (let i = 0; i < shoppingCart.length; i++) {

        // get container - add divs
        let productDiv = $('<div>').addClass('productDiv').appendTo($('.shoppingCart'));
        let productImage = $('<img>').addClass('productImageCheckout').attr('src', "../"+shoppingCart[i].image).appendTo(productDiv);
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

        $('#confirmPurchaseButton').addClass("emptyCartButton");
    }
}

/* Uppdaterar produkterna i LS vi kan använda dem på alla andra sidor också */
function storeProductInLS(){
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    localStorage.setItem("totalPrice", totalPrice);
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

    storeProductInLS();
    createCheckoutHtml(); 
};

// add products
function addProductAmount (product){
    product.inCart++
    totalPrice += product.price;
    createCheckoutHtml();
    storeProductInLS();

};