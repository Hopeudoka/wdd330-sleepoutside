import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"; 
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
        this.itemTotal = this.list.reduce(
            (sum, item) => sum + (item.FinalPrice * (item.quantity || 1)),
            0
        );
        this.itemCount = this.list.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );
        const subtotalElem = document.querySelector(`${this.outputSelector} #summary-subtotal`);
        if (subtotalElem) subtotalElem.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
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
    packageItems(items) {
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));
    }
    async checkout(form) {
        const order = formDataToJSON(form);

        if (order.exp) {
            const [year, month] = order.exp.split("-");
            order.expiration = `${parseInt(month, 10)}/${year.slice(-2)}`;
            delete order.exp;
        }

        order.cardNumber = order.ccnum;
        delete order.ccnum;
        order.code = order.cvv;
        delete order.cvv;

        order.orderDate = new Date().toISOString();
        order.items = this.packageItems(this.list);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;

        const service = new ExternalServices();
        try {
            const response = await service.checkout(order);
            alert("Order submitted successfully!");
            localStorage.removeItem(this.key);
            window.location.href = "/"; 
        } catch (err) {
            alert("Order failed: " + err.message);
        }
    }
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};
    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}