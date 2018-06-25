function change_page(x) {
  var ul = document.querySelector("ul");
  for (i = 0; i < ul.childElementCount; i++) {
    ul.children[i].className = "";
  }
  x.className = "active";
  var id = x.children[0].innerHTML.toLowerCase();
  document.getElementById("home").style.display = "none";
  document.getElementById("orders").style.display = "none";
  //document.getElementById("product").style.display = "none";
  document.getElementById(id).style.display = "block";
}