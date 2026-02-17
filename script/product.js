const categoryContainer = document.getElementById("categories");
const productContainer = document.getElementById("products");

function setActive(btn){
  document.querySelectorAll("#categories button")
  .forEach(b=>b.classList.remove("bg-primaryColor","text-white"));
  btn.classList.add("bg-primaryColor","text-white");
}

// Load Categories
fetch("https://fakestoreapi.com/products/categories")
.then(res=>res.json())
.then(categories=>{
  const allBtn = document.createElement("button");
  allBtn.textContent="All";
  allBtn.className="btn btn-sm bg-primaryColor text-white border-none";
  allBtn.onclick=()=>{loadAll();setActive(allBtn);}
  categoryContainer.appendChild(allBtn);

  categories.forEach(cat=>{
    const btn=document.createElement("button");
    btn.textContent=cat;
    btn.className="btn btn-sm btn-outline";
    btn.onclick=()=>{loadCategory(cat);setActive(btn);}
    categoryContainer.appendChild(btn);
  });
});

// Load All
function loadAll(){
  fetch("https://fakestoreapi.com/products")
  .then(res=>res.json())
  .then(showProducts);
}

// Load by Category
function loadCategory(category){
  fetch(`https://fakestoreapi.com/products/category/${category}`)
  .then(res=>res.json())
  .then(showProducts);
}

// Show Products
function showProducts(products){
  productContainer.innerHTML="";
  products.forEach(product=>{
    productContainer.innerHTML+=`
    <div class="card bg-base-100 shadow-lg hover:shadow-xl transition">
      <figure class="p-6">
        <img src="${product.image}" class="h-48 object-contain"/>
      </figure>
      <div class="card-body">
        <div class="flex gap-50 justify-between text-justify">
      <span class="badge badge-outline text-blue-400">${product.category}</span>
      <p class="text-yellow-500 pl-20 "> ${product.rating.rate} (${product.rating.count})</p>
      </div>
        <h2 class="card-title text-sm">
          ${product.title.length>45?product.title.substring(0,45)+"...":product.title}
        </h2>
        <p class="font-bold">$${product.price}</p>
        
        <div class="card-actions justify-between">
          <button onclick="openModal(${product.id})" class="btn btn-outline px-10">Details</button>
        <button class="btn p-5 bg-blue-800 text-white border-none">Add to cart</button>
        </div>
      </div>
    </div>`;
  });
}

// Modal
function openModal(id){
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res=>res.json())
  .then(product=>{
    modalTitle.innerText=product.title;
    modalImage.src=product.image;
    modalDesc.innerText=product.description;
    modalPrice.innerText="$"+product.price;
    modalRating.innerText=""+product.rating.rate+" ("+product.rating.count+")";
    productModal.showModal();
  });
}

// Initial Load
loadAll();
