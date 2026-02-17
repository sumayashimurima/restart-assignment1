fetch("https://fakestoreapi.com/products?limit=3")
.then(res=>res.json())
.then(products=>{
  const container = document.getElementById("homeProducts");
  products.forEach(product=>{
    container.innerHTML += createCard(product);
  });
});

function createCard(product){
  return `
  <div class="card bg-base-100 shadow-lg hover:shadow-xl transition">
    <figure class="p-6">
      <img src="${product.image}" class="h-48 object-contain"/>
    </figure>
    <div class="card-body">
      <div class="flex gap-50 justify-between text-justify">
      <span class="badge badge-outline text-blue-400">${product.category}</span>
      <p class="text-yellow-500 "> ${product.rating.rate} (${product.rating.count})</p>
      </div>
      <h2 class="card-title text-sm">
        ${product.title.length>40?product.title.substring(0,40)+"...":product.title}
      </h2>
      <p class="font-bold">$${product.price}</p>
      
      <div class="card-actions justify-between">
        <button onclick="openModal(${product.id})" class="btn btn-outline px-10">Details</button>
        <button class="btn p-5 bg-blue-800 text-white border-none">Add to cart</button>
      </div>
    </div>
  </div>`;
}

function openModal(id){
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res=>res.json())
  .then(product=>{
    modalTitle.innerText = product.title;
    modalImage.src = product.image;
    modalDesc.innerText = product.description;
    modalPrice.innerText = "$"+product.price;
    modalRating.innerText = " "+product.rating.rate+" ("+product.rating.count+")";
    productModal.showModal();
  });
}