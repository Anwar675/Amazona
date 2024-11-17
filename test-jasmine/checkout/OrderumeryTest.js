import { renderOrderSummer } from "../../scripts/checkout/odersumery.js";
import { addCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: ', () => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    `;


    it('displays the cart', () => {
        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        // Load from storage and render order summary
        loadFromStorage();
        renderOrderSummer();


        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0)
        // Add assertions here if needed
    });

    document.querySelector(`.js-delete-link-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)
});
