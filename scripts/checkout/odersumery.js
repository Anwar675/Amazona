import { cart, removeCart , updateCart, updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {dileverlyOptions, getDeliveryOption} from '../../data/dilevelyOption.js'
import { RederPaymentSummary } from "./PaySumery.js";

function updateQuatity() {
    let totalQuantity = 0;
    
    // Calculate the total quantity of items in the cart
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });
    
    // Update the return-to-home-link with the total quantity
    const checkoutitem = document.querySelector('.return-to-home-link');
    if (checkoutitem) {
        checkoutitem.textContent = `${totalQuantity} items`;
    }
}


export function renderOrderSummer(){
    let cartSumary = ''

    cart.forEach(cartItem => {
        const productId = cartItem.productId

        const matchingProduct = products.find(product => product.id === productId);

        const deliveryOptionId = cartItem.deliveryOptionId

        const deliveryOption = getDeliveryOption(deliveryOptionId)

        
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        )

        
        cartSumary += `
        <div class="cart-item-container js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${(matchingProduct.getPrice())}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-link-update">
                    Update
                    </span>
                    <input type="number" class="js-input-update">
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTMl(matchingProduct,cartItem)}
                </div>
            </div>
            </div>
        `;



        document.querySelector('.js-order-summary').innerHTML = cartSumary

    })

    function deliveryOptionsHTMl(matchingProduct, cartItem) {
        let html = ''
        dileverlyOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            )

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${( deliveryOption.priceCents / 100).toFixed(2)} - `

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId
            
            html +=`
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked': ''} class="delivery-option-input"
                name="${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
            `
        })
        return html
    }


    document.querySelectorAll('.js-delete-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeCart(productId)

            const container = document.querySelector(`.js-item-container-${productId}`)
            container.remove()
            updateQuatity()
            RederPaymentSummary()
        })
    })

    const Update = document.querySelectorAll('.js-link-update')



    Update.forEach((UpdateItem,index) => {
        UpdateItem.addEventListener('click', () => {
            const UpdateInput = document.querySelectorAll('.js-input-update')[index]
            if(UpdateInput) {
                UpdateInput.style.display = 'inline-block'      
            }
        })
    })


    document.querySelectorAll('.js-input-update').forEach((inputField, index) => {
        inputField.addEventListener('blur', () => {
            let newQuantity = parseInt(inputField.value, 10);

            if (isNaN(newQuantity)) {
                newQuantity = 1; // Giá trị mặc định nếu không phải số hợp lệ
            } else {
                // Đảm bảo newQuantity nằm trong khoảng từ 1 đến 100
                newQuantity = Math.max(1, Math.min(newQuantity, 100));
            }

            const quantityLabel = document.querySelectorAll('.quantity-label')[index];
            const productId = document.querySelectorAll('.js-delete-link')[index].dataset.productId;
            
            // Cập nhật giao diện

            quantityLabel.textContent = newQuantity;
            
            inputField.style.display = 'none';
            
            // Cập nhật số lượng trong giỏ hàng
            updateCart(productId, newQuantity);
            updateQuatity()
            RederPaymentSummary()
        });

    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', ()=> {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId,deliveryOptionId)
            renderOrderSummer()
            RederPaymentSummary()
        })
    })
    
}
updateQuatity()
