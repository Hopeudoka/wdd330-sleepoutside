import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }
    calculateItemSubTotal() {
        // Calculate subtotal and item count
        this.itemTotal = this.list.reduce(
            (sum, item) => sum + (item.FinalPrice * (item.quantity || 1)),
            0
        );
        this.itemCount = this.list.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );
        // Display subtotal
        const subtotalElem = document.querySelector(`${this.outputSelector} #summary-subtotal`);
        if (subtotalElem) subtotalElem.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
    calculateOrderTotal() {
        // Tax: 6% of subtotal
        this.tax = this.itemTotal * 0.06;
        // Shipping: $10 for first item, $2 for each additional
        this.shipping = this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;
        // Order total
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        // Display all totals
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const taxElem = document.querySelector(`${this.outputSelector} #summary-tax`);
        const shippingElem = document.querySelector(`${this.outputSelector} #summary-shipping`);
        const totalElem = document.querySelector(`${this.outputSelector} #summary-total`);
        if (taxElem) taxElem.textContent = `$${this.tax.toFixed(2)}`;
        if (shippingElem) shippingElem.textContent = `$${this.shipping.toFixed(2)}`;
        if (totalElem) totalElem.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
}