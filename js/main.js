class Product {
    constructor(id, image, name, height, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.height = height;
        this.price = price;
        this.inCart = 0;
    }
}



$(function() {
    
//    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
//img.attr('src', responseObject.imgurl);
//img.appendTo('#imagediv');



    let p1 = new Product("elise", '../images/gran2.png', "Elise", "Toppengran verkligen", "500");
    let p2 = new Product("kristoffer", '../images/gran6.png', "Kristoffer", "Toppengran verkligen", "150");
    let p3 = new Product("ivan", '../images/gran3.png', "Ivan", "Toppengran verkligen", "650");
    let p4 = new Product("lydia", '../images/gran5.png', "Lydia", "Toppengran verkligen", "350");
    let p5 = new Product("vera", '../images/gran1.jpg', "Vera", "Toppengran verkligen", "200");
    let p6 = new Product("jan", '../images/gran4.png', "Jan", "Toppengran verkligen", "800");

    let products = [p1, p2, p3, p4, p5, p6];

    $.each(products, (i, product) => {
    console.log(product);

    let container = $("#productlist");
    let listitem = $("<li>")

    
   $("<img>").addClass("image").attr('src', product.image).appendTo(listitem);
   $("<p>").html(product.price + "kr").addClass("price").appendTo(listitem);
    $("<p>").html(product.name).addClass("name").appendTo(listitem);
    $("<div>").addClass("fas fa-shopping-cart").appendTo(listitem);


    listitem.appendTo(container);
    container.appendTo($(".main"));


})
})
