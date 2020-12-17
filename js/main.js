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

// temporary shopping cart while developing
let tempShoppingCart = [];

$(function() {

    let p1 = new Product('../css/images/gran1.png', "Elise", 200, 500, 1);
    let p2 = new Product('../css/images/gran1.png', "Kristoffer", 100, 150, 1);
    let p3 = new Product('../css/images/gran1.png', "Ivan", 250, 650, 1);
    let p4 = new Product('../css/images/gran1.png', "Lydia", 70, 350, 1);
    let p5 = new Product('../css/images/gran1.png', "Vera", 50, 200, 1);
    let p6 = new Product('../css/images/gran1.png', "Jan", 300, 800, 1);

    let products = [p1, p2, p3, p4, p5, p6];

    $(".toggle").on("click",openMobileNavbar);

    //modifyShoppingCart();

    shoppingCartContainer.appendTo($("#shoppingCartWindow"));

    checkShoppingCart();
    $("#shoppingCartWindowButton").on("click", openShoppingCartWindow);
  
    // $.each(products, (i, product) => {

    let container = $("#productlist");
    let listitem = $("<li>");

    /*
    $("<img>").addClass("image").attr('src', product.image).appendTo(listitem);
    $("<p>").html(product.price + "kr").addClass("price").appendTo(listitem);
    $("<p>").html(product.name).addClass("name").appendTo(listitem);
    $("<div>").addClass("fas fa-shopping-cart").appendTo(listitem);
    */

    listitem.appendTo(container);
    container.appendTo($(".main"));

    // add products to temporary shopping cart
    tempShoppingCart.push(p1, p2, p3);

    //add total price of temporary shopping cart
    for (let i = 0; i < tempShoppingCart.length; i++) {
        totalPrice += tempShoppingCart[i].price;        
    }
    
    createCheckoutHtml();
});

function createCheckoutHtml () {
    $('.shoppingCart').html('');

    for (let i = 0; i < tempShoppingCart.length; i++) {

        // get container - add divs
        let productDiv = $('<div>').addClass('productDiv').appendTo($('.shoppingCart'));
        let productImage = $('<img>').addClass('productImageCheckout').attr('src', tempShoppingCart[i].image).appendTo(productDiv);        
        let productInfo = $('<div>').addClass('productInfo').appendTo(productDiv);        
        let productAmount = $('<div>').addClass('productAmount').appendTo(productDiv);  

        // add product info - name, height, price
        $('<p>').addClass('productName').html(tempShoppingCart[i].name).appendTo(productInfo);                
        $('<p>').addClass('productHeight').html(tempShoppingCart[i].height + ' cm').appendTo(productInfo);                
        $('<p>').addClass('productPrice').html(tempShoppingCart[i].price + ' SEK').appendTo(productInfo);  
                
        // add buttons + amount p tag
        $('<button>').addClass('productButton').html('-').appendTo(productAmount).on('click', ()=> {subtractProductAmount(tempShoppingCart[i])});
        $('<p>').html(tempShoppingCart[i].inCart).appendTo(productAmount);
        $('<button>').addClass('productButton').html('+').appendTo(productAmount).on('click', ()=> {addProductAmount(tempShoppingCart[i])});
    }

    $('.totalPriceP').html("Totalt: " + totalPrice + " SEK");

    // h2 if cart is empty
    if (tempShoppingCart.length == 0) {
        $('<h2>').html('Din varukorg är tom').addClass('emptyCheckoutCart').appendTo($('.shoppingCart'));
    }
}

// subtract products
function subtractProductAmount (product){
    product.inCart--
    totalPrice -= product.price;

    // splice product if amount = 0
    if (product.inCart === 0) {
        for (let i = 0; i < tempShoppingCart.length; i++) {
            if (tempShoppingCart[i].id == product.id) {
                tempShoppingCart.splice(i, 1);
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
          $("<p>").html("-").attr("id","removeSameItem"+item.id).attr("class", "addOrRemoveIcons").appendTo(addOrRemoveSameItem);
          $("<p>").attr("id","itemCount").html(item.inCart).appendTo(addOrRemoveSameItem);
          $("<p>").html("+").attr("id","addSameItem"+item.id).attr("class", "addOrRemoveIcons").appendTo(addOrRemoveSameItem);
          addOrRemoveSameItem.appendTo(showItems);

          let showPriceDiv = $("<div>").attr("class", "priceDiv");
          $("<p>").html(item.price + " kr").appendTo(showPriceDiv);
          $("<a>").attr("class", "trashicon fas fa-trash-alt").attr("id", "removeItemFromShoppingCart"+item.id).appendTo(showPriceDiv);
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
          $("<button>").html("Töm varukorgen").attr("id", "emptyShoppingCart").appendTo(buttonDivs);
          buttonDivs.appendTo(container);
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
      $("#shoppingCartWindow").html("<p>Din varukorg är just nu tom!</p>");
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

  console.log(e.data.removeThisItem.price*e.data.removeThisItem.inCart);
  console.log("Nuvarande totalpris: ",totalPrice);

  checkShoppingCart();
}
