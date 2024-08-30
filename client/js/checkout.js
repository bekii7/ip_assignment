document.addEventListener('DOMContentLoaded', () => {
  let cartItems = [
  ];
  async function fetchCart (){
    const response = await fetch('http://localhost:8000/carts')
    const data = await response.json()
    console.log(data)
    cartItems  = data
    const deliveryFee = 5.99;
  const orderDetailsDiv = document.querySelector('.order-details');
  const totalPriceElem = document.getElementById('total-price');
  const deliveryFeeElem = document.getElementById('delivery-fee');

  let totalPrice
  cartItems.forEach(item => {
      const itemPrice = Number(item.itemPrice)
      totalPrice = cartItems.reduce((acc, item) => acc + itemPrice, 0) + deliveryFee;
    
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
          <div>
              <p><strong>${item.itemName}</strong></p>
          </div>
          <p>$${itemPrice.toFixed(2)}</p>
      `;
      orderDetailsDiv.appendChild(itemDiv);
  });

  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
  deliveryFeeElem.textContent = `$${deliveryFee.toFixed(2)}`;

  } 
  fetchCart()
  });
