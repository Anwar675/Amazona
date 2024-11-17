const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


export let cart 

loadFromStorage()

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
    cart = []
  }
}



function savetoStore() {
  localStorage.setItem('cart', JSON.stringify(cart))
}


export function addCart(productId, productContainer) {
    const selectedQuantity = productContainer.querySelector('select').value;
    
    let makeID = cart.find(cartItem => cartItem.productId === productId);

    
    if(makeID) {
      makeID.quantity += parseInt(selectedQuantity)
    } else {
      cart.push({
        productId: productId,
        quantity: parseInt(selectedQuantity),
        deliveryOptionId: '1'
        
      });
      
    }
    savetoStore()
}

export function removeCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart
  savetoStore()
}

export function updateCart(productId, newQuantity) {
  const cartItem = cart.find(item => item.productId === productId)

  if(cartItem) {
    cartItem.quantity = newQuantity
  }

  savetoStore()
}


export function updateDeliveryOption(productId,deliveryOptionId) {
  let makeID = cart.find(cartItem => cartItem.productId === productId);

  makeID.deliveryOptionId = deliveryOptionId;
  savetoStore()
}


export function formatcurrency(hi) {
  return (Math.round(hi)/100).toFixed(2)
}