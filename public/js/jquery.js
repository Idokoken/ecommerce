$(document).ready(function () {
  $(".buttonContainer").on("click", "button", function () {
    let color = $(this).text();

    $.ajax({
      url: `/product/${color}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $(".productContainer").html("");
        for (i = 0; i < data.products.length; i++) {
          let img = data.products[i].cover;
          let title = data.products[i].title;
          let price = data.products[i].price;
          let ID = data.products[i].id;

          $("productContainer").append(`
	  		 	  	<div class="listing">
           <div class="listingImg">
             <a href="${ID}"
             <img src="${img}" />
             </a>
           </div>
           
            <div class="listingTitle">
             <a href="${ID}"
              <p>${title}</p></a>
            </div>
             
            <div class="listingPrice">
              <p>$${price}</p>
            </div>
            <div class="listingButton">
              <button id="buyNow">Buy it now</button>
              <button value="${ID}" id="addCart">Add to Cart</button>
            </div>
         </div>
	  		 	  	`);
        }
      },
    });
  });

  $("body").on("click", "#addCart", function () {
    var ID = $(this).val();
    $.ajax({
      url: `/addcart/${ID}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $(".navlink em").html("");
        let cartNumb = data.cartNumb;
        $(".navlink em").html(cartNumb);
      },
    });
  });
});
