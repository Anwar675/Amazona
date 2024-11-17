const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


class Cart {
    cartItems ;
    #localStorageKey;


    constructor(localStorageKey) {              
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage()
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      
        if(!this) {
          this.cartItems = [
           {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
            
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '1'
            
          }]
        }
    }

    savetoStore() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))  
    }

    addCart(productId) {
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
    };


    removeCart(productId) {
        const newCart = []
      
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId !== productId) {
            newCart.push(cartItem)
          }
        })
      
        this.cartItems = newCart
        this.savetoStore()
    };

    updateCart(productId, newQuantity) {
        const cartItem = this.cartItems.find(item => item.productId === productId)
      
        if(cartItem) {
          cartItem.quantity = newQuantity
        }
      
        this.savetoStore()
    };
    
    updateDeliveryOption(productId,deliveryOptionId) {
        let makeID = this.cartItems.find(cartItem => cartItem.productId === productId);
    
        makeID.deliveryOptionId = deliveryOptionId;
        this.savetoStore()
    }

}











const cart = new Cart('cart-oop')

cart.localStorageKey = 'test'

console.log(cart)