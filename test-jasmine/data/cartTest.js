import { addCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suit: addCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); // Giả lập localStorage rỗng
        });

        spyOn(localStorage, 'setItem'); // Mô phỏng setItem để kiểm tra khi lưu trữ

        loadFromStorage(); // Nạp dữ liệu từ localStorage (mặc định là rỗng)
    });

    it('adds an existing product to the cart', () => {
        const productContainer = {
            querySelector: () => ({ value: "3" }) // Giả lập chọn 3 sản phẩm
        };

        // Thêm sản phẩm đầu tiên vào giỏ hàng
        addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', productContainer);
        
        // Thêm lại cùng sản phẩm
        addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', productContainer);

        expect(cart.length).toEqual(1); // Vẫn chỉ có 1 sản phẩm
        
        expect(cart[0].quantity).toEqual(6); // Số lượng sản phẩm được cập nhật thành 6 (3 + 3)
        
    });

    it('adds a new product to the cart', () => {
        const productContainer = {
            querySelector: () => ({ value: "2" }) // Giả lập chọn 2 sản phẩm
        };

        // Thêm sản phẩm mới vào giỏ hàng
        addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', productContainer);

        expect(cart.length).toEqual(1); // Giỏ hàng có 1 sản phẩm
        expect(cart[0].quantity).toEqual(2); // Số lượng là 2
        
    });
});
