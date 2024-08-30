
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const itemId = urlParams.get('productId');
  const user = urlParams.get('user')
  const productTitle = document.querySelector('.product-title')
  const brandName = document.querySelector('.brandName')
  const productType = document.querySelector('.productType')
  const price = document.querySelector('.price')
  const color = document.querySelector('.color-box')
  const image = document.querySelector('.product-image')
  const quantity = document.querySelector('.quantity-input')
  const add = document.querySelector('.add-to-cart')

  console.log(user)

  const similarItemsContainer = document.getElementById('similar-items');
  
  async function fetchProducts() {
      try {
          const response = await fetch('http://localhost:8000/products');
          const products = await response.json();
          filterSimilarItems(products);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  }

  function filterSimilarItems(products) {
      let selectedItem;
      let similarItems = [];

      for (const product of products) {
          if (product.id === itemId) {
              selectedItem = product;
              break;
          }
      }
      
      productTitle.innerText = selectedItem.name
      productType.innerText = selectedItem.groupId
      price.innerText = selectedItem.price.currentPrice.value
      color.style.backgroundColor = `${selectedItem.colour}`
      if (selectedItem) {
          similarItems = products.filter(product => product.groupId === selectedItem.groupId);
      }

      displaySimilarItems(similarItems);
  }

  

  fetchProducts();

add.addEventListener('click',async ()=>{
  const itemName = productTitle.innerText
  const itemPrice = price.innerText
  const value = quantity.value
  console.log(value)
  try {
    await fetch('http://localhost:3000/newItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, itemPrice,quantity:value,user })
    });
    
} catch (error) {
    console.error('Error:', error);
}
})