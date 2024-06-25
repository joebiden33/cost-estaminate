const yuanToPlnRate = 0.65;
const shippingRates = {
    dhl: 80,
    cnline: 60
};

let totalItemPricePln = 0;
let totalShippingCost = 0;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPriceYuan = parseFloat(document.getElementById('itemPrice').value);
    const itemWeightGrams = parseFloat(document.getElementById('itemWeight').value);
    const shippingMethod = document.getElementById('shippingMethod').value;

    const itemPricePln = itemPriceYuan * yuanToPlnRate;
    const itemWeightKg = itemWeightGrams / 1000;
    const shippingCost = itemWeightKg * shippingRates[shippingMethod];

    totalItemPricePln += itemPricePln;
    totalShippingCost += shippingCost;

    const tableBody = document.getElementById('summaryTableBody');
    const newRow = tableBody.insertRow();

    const cellItemName = newRow.insertCell(0);
    const cellItemPriceYuan = newRow.insertCell(1);
    const cellItemPricePln = newRow.insertCell(2);
    const cellItemWeightGrams = newRow.insertCell(3);
    const cellShippingMethod = newRow.insertCell(4);
    const cellShippingCost = newRow.insertCell(5);
    const cellRemoveButton = newRow.insertCell(6);

    cellItemName.textContent = itemName;
    cellItemPriceYuan.textContent = itemPriceYuan.toFixed(2);
    cellItemPricePln.textContent = itemPricePln.toFixed(2);
    cellItemWeightGrams.textContent = itemWeightGrams.toFixed(2);
    cellShippingMethod.textContent = shippingMethod === 'dhl' ? 'DHL' : 'CNLine';
    cellShippingCost.textContent = shippingCost.toFixed(2);
    cellRemoveButton.innerHTML = '<button onclick="removeItem(this)">Usuń</button>';

    updateTotalPrice();
    clearForm();
}

function removeItem(button) {
    const row = button.parentNode.parentNode;
    const itemPricePln = parseFloat(row.cells[2].textContent);
    const shippingCost = parseFloat(row.cells[5].textContent);

    totalItemPricePln -= itemPricePln;
    totalShippingCost -= shippingCost;

    row.remove();
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = totalItemPricePln + totalShippingCost;
    document.getElementById('totalPrice').textContent = `${totalPrice.toFixed(2)} PLN`;
}

function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemWeight').value = '';
    document.getElementById('shippingMethod').selectedIndex = 0;
}
