import { getProducts } from "../../data/products.js";
import { cart } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/dilevelyOption.js";



function updateQuatity() {
    let totalQuantity = 0;
    
    // Calculate the total quantity of items in the cart
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity;
    });
    
    // Update the return-to-home-link with the total quantity
    const checkoutitem = document.querySelector('.js-order-summary-item');
    if (checkoutitem) {
        checkoutitem.textContent = totalQuantity
    }

    return totalQuantity
}

export function RederPaymentSummary() {

let productPriCents = 0
let shippingPricent = 0 

    cart.forEach(cartItem => {
        const product = getProducts(cartItem.productId)
        productPriCents += product.priceCents * cartItem.quantity

        const degetDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPricent +=  degetDeliveryOption.priceCents
    }); 
    
    const totalBeforeTaxCents = productPriCents + shippingPricent
    const taxCent = totalBeforeTaxCents * 0.1
    const totalCenst = totalBeforeTaxCents + taxCent

    const paymenSumarryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div class="js-order-summary-item">Items: (${updateQuatity()})</div>
            <div class="payment-summary-money">$${(productPriCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPricent/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCent/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCenst/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymenSumarryHTML


}

