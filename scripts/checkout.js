import { renderOrderSummer } from "./checkout/odersumery.js";
import { RederPaymentSummary } from "./checkout/PaySumery.js";
import { loadProducts } from "../data/products.js";


loadProducts(() => {
    renderOrderSummer()
    RederPaymentSummary()
})