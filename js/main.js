class Product {
    constructor(id, image, name, height, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.height = height;
        this.price = price;
    }
}



$(function() {
    
   var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
//img.attr('src', responseObject.imgurl);
//img.appendTo('#imagediv');



    let p1 = new Product("elise", 'url("/css/images/gran1.png")', "Elise", "Toppengran verkligen", "500kr");
    let p2 = new Product("kristoffer", 'url("/css/images/gran2.png")', "Kristoffer", "Toppengran verkligen", "500kr");
    let p3 = new Product("ivan", 'url("/css/images/gran3.png")', "Ivan", "Toppengran verkligen", "500kr");
    let p4 = new Product("lydia", 'url("/css/images/gran4.png")', "Lydia", "Toppengran verkligen", "500kr");
    let p5 = new Product("vera", 'url("/css/images/gran5.png")', "Vera", "Toppengran verkligen", "500kr");
    let p6 = new Product("jan", 'url(/css/images/gran6.png)', "Jan", "Toppengran verkligen", "500kr");

    let products = [p1, p2, p3, p4, p5, p6];

    $.each(products, (i, product) => {
    console.log(product);

    let container = $("#productlist");
    let listitem = $("<li>")

   // img.attr('src', product.image).appendTo(container);
   $("<div>").html(product.image).addClass("image").appendTo(listitem);
    $("<p>").html(product.name).addClass("name").appendTo(listitem);
    $("<p>").html(product.price).addClass("price").appendTo(listitem);

    listitem.appendTo(container);
    container.appendTo($(".main"));

})
})