const profileLink = document.getElementById('profile-link')
const addTrending = document.querySelectorAll('.add-button')
const cartNum = document.querySelector('.cartNum')
const itemsDiv =document.querySelector('.itemsDiv')
const cats = document.querySelectorAll('.cat')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user = urlParams.get('user');
const search = document.querySelector('.search-icon')
const searchValue = document.querySelector('.search').value
//profile page select
const signedIn =false


//add to cart for the trending items

addTrending.forEach(item=>{

  item.addEventListener("click",async (e)=>{  
    console.log(user)
    e.preventDefault()
    const itemName = item.previousElementSibling.parentElement.previousElementSibling.innerText
    const itemPrice = item.previousElementSibling.innerText
    try {
      const response = await fetch('http://localhost:3000/newItem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemName, itemPrice,quantity:1 ,user})
      })
       const data = await response.json()
       if (data.success) {
        cartNum.innerText = Number(cartNum.innerText ) +1 
    } else {
        alert('the server is down')
    }
      }catch(err){
    console.log(err)
  }
})
})
cats.forEach((cat)=>{
  cat.addEventListener("click",()=>{
    cats.forEach((cat)=>{
      cat.classList.remove('category-active')
    })
    cat.classList.add('category-active')
  })
})

let products;
async function fetchProducts(){
  const response = await fetch('http://localhost:8000/products')
  products = await response.json()
  
  let productNum = 0
  await products.forEach((items)=>{
    
    itemsDiv.innerHTML += 
    `<div class="item-card">
    <a href="../client/product.html?productId=${items.id}&user=${user}" class="link">
    <img src="../../server/product images/shopping${productNum}.jpg" class="item-image" >
    <h3 class="item-title">${items.name}</h3>
    <div class="item-info">
    <p class="item-price">$ ${items.price.current.value}</p>
    </a>
    <div class="add-to-cart">
    <i class="fa-regular fa-bag icon"></i>
    <p>Add</p>
    </div>
    </div>`
    productNum++
    const addToCart = document.querySelectorAll('.add-to-cart')
    
    addToCart.forEach(item => {
      
      item.addEventListener("click", async (e) => { 
        e.preventDefault();
        
        
        const itemCard = item.closest('.item-card');
        
        
        const itemName = itemCard.querySelector('.item-title').innerText;
        const itemPrice = itemCard.querySelector('.item-price').innerText;
        
        console.log(itemName, itemPrice);
        try {
              const response = await fetch('http://localhost:3000/newItem', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ itemName, itemPrice,quantity:1, user})
              })
               const data = await response.json()
               if (data.success) {
                cartNum.innerText = Number(cartNum.innerText ) +1 
            } else {
                alert('the server is down')
            }
        
              }catch(err){
            console.log(err)
          }
      });
    });
  })}
  fetchProducts()


  search.addEventListener('click', () => {
    console.log(search.value)
    if (search.value.trim() !== "") { 
      console.log('the');
    }
  });