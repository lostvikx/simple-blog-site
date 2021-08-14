"use strict";

const del = document.getElementById("btn-delete");

del.addEventListener("click", (e) => {
  e.preventDefault();

  const endpoint = `/blogs/${del.dataset.doc}`;

  // console.log(endpoint);
  
  // AJAX request
  fetch(endpoint, {
    method: "DELETE"
  })
    .then(res => res.json())  // receive json convert to obj
    // .then(data => console.log(data))  // obj { redirect: "/blogs" }
    .then(data => window.location.href = data.redirect)
    .catch(err => console.log(err));

});