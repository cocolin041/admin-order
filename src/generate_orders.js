function generate_orders() {
  var table = document.getElementById("table");
    //div table-content
    var table_content = document.createElement("DIV");
    table_content.className = "table-content";
      //div checkbox
      var checkbox = document.createElement("DIV");
      checkbox.className = "checkbox";
      //div customer
      var customer = document.createElement("DIV");
      customer.className = "customer";
      customer.innerHTML = faker.name.findName();
      //div product-list
      var product_list = document.createElement("DIV");
      product_list.className = "product-list";
        //div how many items
        var item_number = Math.floor((Math.random() * 3) + 1);
        for (i = 0; i < item_number; i++) {
          //div item
          var item = document.createElement("DIV");
          item.className = "item";
            //div product-name
            var product_name = document.createElement("DIV");
            product_name.className = "product-name";
            product_name.innerHTML = faker.commerce.productName();
            //div price-quantity
            var price_quantity = document.createElement("DIV");
              //span price
              var price = document.createElement("SPAN");
              price.className = "price";
              price.innerHTML = "$" + faker.commerce.price();
              //span quantity
              var quantity = document.createElement("SPAN");
              quantity.className = "quantity";
              quantity.innerHTML = "1";
            //finish price-quantity: append price, 
            price_quantity.appendChild(price);
            price_quantity.appendChild(quantity);
          //finish item: append product-name, 
          item.appendChild(product_name);
          item.appendChild(price_quantity);
        //finish product-list: append item
        product_list.appendChild(item);
        }
      //div total
      var total = document.createElement("DIV");
      total.className = "total";
      total.innerHTML = "$" + faker.commerce.price();
      //div add-to-cart
      var add_to_cart = document.createElement("DIV");
      add_to_cart.className = "add-to-cart";
        //div date
        var date = document.createElement("DIV");
        date.className = "date";
        date.innerHTML = faker.date.past().toDateString();
        //div time
        var time = document.createElement("DIV");
        time.className = "time";
        time.innerHTML = faker.date.past().toTimeString();
      //finish add-to-cart: append date, time
      add_to_cart.appendChild(date);
      add_to_cart.appendChild(time);
      //div check-out
      var check_out = document.createElement("DIV");
      check_out.className = "check-out";
        //use the same date and time temporarily
      //finish add-to-cart: append date, time
      check_out.appendChild(date);
      check_out.appendChild(time);
      //div address
      var address = document.createElement("DIV");
      address.className = "address";
      address.innerHTML = faker.address.streetAddress() + faker.address.secondaryAddress();
      //div status
      var status2 = document.createElement("DIV");
      status2.className = "status";
        //select
        var select = document.createElement("SELECT");
          //option
          var option1 = document.createElement("OPTION");
          option1.setAttribute("value", "paid");
          option1.innerHTML = "PAID";

          var option2 = document.createElement("OPTION");
          option2.setAttribute("value", "shipping");
          option2.innerHTML = "SHIPPING";

          var option3 = document.createElement("OPTION");
          option3.setAttribute("value", "done");
          option3.innerHTML = "DONE";

          var option4 = document.createElement("OPTION");
          option4.setAttribute("value", "unpaid");
          option4.innerHTML = "UNPAID";

        //finish select: append option1, option2, option3, option4
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
      //finish status: append select
      status2.appendChild(select);

    //finish table-content: append checkbox, customer, product-list, total, add-to-cart, check_out, address
    table_content.appendChild(checkbox);
    table_content.appendChild(customer);
    table_content.appendChild(product_list);
    table_content.appendChild(total);
    table_content.appendChild(add_to_cart);
    table_content.appendChild(check_out);
    table_content.appendChild(address);
    table_content.appendChild(status2);
  //finish table: append table-content
  table.appendChild(table_content);
}
var count = 0;
function runAgain() {
  while (count < 30) {
    generate_orders();
    count = count + 1;
  } 
}
runAgain();
//setTimeout(runAgain, 1000);