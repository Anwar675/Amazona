

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function Cart(localStorageKey) {

    const cart = {
        cartItems: undefined,
    
    
        loadFromStorage: function() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
          
            if(!this) {
              this.cartItems = [
               {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
                
              }]
            }
        },
    
        
        savetoStore: function() {
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems))  
        },
    
        addCart: function(productId) {
            // const selectedQuantity = productContainer.querySelector('select').value;
            
            const makeID = this.cartItems.find(cartItem => cartItem.productId === productId);
        
            
            if(makeID) {
              makeID.quantity += parseInt(1)
            } else {
              this.cartItems.push({
                productId: productId,
                quantity: parseInt(1),
                deliveryOptionId: '1'
                
              });
              
            }
            this.savetoStore()
        },
        removeCart: function(productId) {
            const newCart = []
          
            this.cartItems.forEach((cartItem) => {
              if(cartItem.productId !== productId) {
                newCart.push(cartItem)
              }
            })
          
            this.cartItems = newCart
            this.savetoStore()
        },
        updateCart: function(productId, newQuantity) {
            const cartItem = this.cartItems.find(item => item.productId === productId)
          
            if(cartItem) {
              cartItem.quantity = newQuantity
            }
          
            this.savetoStore()
        },
        
        updateDeliveryOption: function(productId,deliveryOptionId) {
            let makeID = this.cartItems.find(cartItem => cartItem.productId === productId);
        
            makeID.deliveryOptionId = deliveryOptionId;
            this.savetoStore()
      }


        
    };
    return cart
}













const cart = Cart('cart-oop')
cart.loadFromStorage()

console.log(cart)
export function formatcurrency(hi) {
  return (Math.round(hi)/100).toFixed(2)
}