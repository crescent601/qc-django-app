const productFormsContainer = document.getElementById('product_forms_container');
const addProductButton = document.getElementById('add_product_button');
let productFormCount = 1;

function updateMfgTotal(productIndex) {
    const mfgContainer = document.querySelector(`.mfg_details_container_${productIndex}`);
    const quantityInputs = mfgContainer.querySelectorAll(`input[name^="mfg_details-${productIndex}-"][name$="-quantity"]`);
    let totalQuantity = 0;
    quantityInputs.forEach(input => {
        totalQuantity += parseInt(input.value) || 0;
    });
    document.querySelector(`.total-mfg-quantity-${productIndex}`).innerText = totalQuantity;
    // Remove the following line to hide the input box
    // const totalReplacementQtyInput = document.querySelector(`.total-replacement-qty-input-${productIndex}`);
    // if (totalReplacementQtyInput) {
    //     totalReplacementQtyInput.value = totalQuantity;
    // }
}

// Initial MFG add button functionality and quantity update
const initialAddMfgButton = document.querySelector('.add_mfg_button[data-product-index="0"]');
const initialMfgContainer = document.querySelector('.mfg_details_container_0');
const initialMfgQuantityInputs = initialMfgContainer.querySelectorAll('.mfg-quantity-0');

if (initialAddMfgButton) {
    initialAddMfgButton.addEventListener('click', function() {
        const productIndex = this.dataset.productIndex;
        const currentMfgFormCount = initialMfgContainer.querySelectorAll('.mfg_form').length;
        const newMfgFormDiv = document.createElement('div');
        newMfgFormDiv.classList.add('mfg_form');
        newMfgFormDiv.innerHTML = `
            <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date">Manufacturing Date:</label>
            <input type="date" name="mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date" class="mfg-date-${productIndex}" required>
            <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-quantity">Quantity:</label>
            <input type="number" name="mfg_details-${productIndex}-${currentMfgFormCount}-quantity" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-quantity" class="mfg-quantity-${productIndex}" min="1" required>

            <div class="failure-options">
                <label>Failure Type:</label><br>
                <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting">
                <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting">Complete Fitting</label><br>

                <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure">
                <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure">Driver Failure</label><br>

                <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel">
                <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel">Led PCB/PANEL</label><br>

                <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure">
                <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure">IP Failure</label><br>

                <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege">
                <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege">Glass Brackege</label><br>
            </div>
        `;
        initialMfgContainer.appendChild(newMfgFormDiv);
        const totalFormsInput = initialMfgContainer.querySelector(`#id_mfg_details-${productIndex}-TOTAL_FORMS`);
        if (totalFormsInput) {
            totalFormsInput.value = currentMfgFormCount + 1;
        }
        updateMfgTotal(productIndex); // Update total after adding new row

        // Add event listener for the new quantity field
        const newQuantityInput = newMfgFormDiv.querySelector(`.mfg-quantity-${productIndex}`);
        if (newQuantityInput) {
            newQuantityInput.addEventListener('input', function() {
                updateMfgTotal(productIndex);
            });
        }
    });
}

if (initialMfgQuantityInputs) {
    initialMfgQuantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateMfgTotal(0);
        });
    });
}

if (addProductButton) {
    addProductButton.addEventListener('click', function() {
        const newProductFormDiv = document.createElement('div');
        newProductFormDiv.classList.add('product_form');
        newProductFormDiv.innerHTML = `
            <h2>Product ${productFormCount + 1}</h2>
            <label for="id_product-${productFormCount}-product">Product:</label>
            <select name="product-${productFormCount}-product" id="id_product-${productFormCount}-product" required>
                <option value="">Select Product</option>
                ${productOptionsHTML}
            </select>
            <p>Total Quantity Added: <span class="total-mfg-quantity-${productFormCount}">0</span></p>

            <h3>Manufacturing Details for Product ${productFormCount + 1}</h3>
            <div class="mfg_details_container_${productFormCount}">
                <input type="hidden" name="mfg_details-${productFormCount}-TOTAL_FORMS" id="id_mfg_details-${productFormCount}-TOTAL_FORMS" value="1">
                <input type="hidden" name="mfg_details-${productFormCount}-INITIAL_FORMS" id="id_mfg_details-${productFormCount}-INITIAL_FORMS" value="0">
                <input type="hidden" name="mfg_details-${productFormCount}-MAX_NUM_FORMS" id="id_mfg_details-${productFormCount}-MAX_NUM_FORMS" value="1000">
                <div class="mfg_form">
                    <label for="id_mfg_details-${productFormCount}-0-mfg_date">Manufacturing Date:</label>
                    <input type="date" name="mfg_details-${productFormCount}-0-mfg_date" id="id_mfg_details-${productFormCount}-0-mfg_date" class="mfg-date-${productFormCount}" required>
                    <label for="id_mfg_details-${productFormCount}-0-quantity">Quantity:</label>
                    <input type="number" name="mfg_details-${productFormCount}-0-quantity" id="id_mfg_details-${productFormCount}-0-quantity" class="mfg-quantity-${productFormCount}" min="1" required>

                    <div class="failure-options">
                        <label>Failure Type:</label><br>
                        <input type="checkbox" name="mfg_details-${productFormCount}-0-complete_fitting" id="id_mfg_details-${productFormCount}-0-complete_fitting">
                        <label for="id_mfg_details-${productFormCount}-0-complete_fitting">Complete Fitting</label><br>

                        <input type="checkbox" name="mfg_details-${productFormCount}-0-driver_failure" id="id_mfg_details-${productFormCount}-0-driver_failure">
                        <label for="id_mfg_details-${productFormCount}-0-driver_failure">Driver Failure</label><br>

                        <input type="checkbox" name="mfg_details-${productFormCount}-0-led_pcb_panel" id="id_mfg_details-${productFormCount}-0-led_pcb_panel">
                        <label for="id_mfg_details-${productFormCount}-0-led_pcb_panel">Led PCB/PANEL</label><br>

                        <input type="checkbox" name="mfg_details-${productFormCount}-0-ip_failure" id="id_mfg_details-${productFormCount}-0-ip_failure">
                        <label for="id_mfg_details-${productFormCount}-0-ip_failure">IP Failure</label><br>

                        <input type="checkbox" name="mfg_details-${productFormCount}-0-glass_brackege" id="id_mfg_details-${productFormCount}-0-glass_brackege">
                        <label for="id_mfg_details-${productFormCount}-0-glass_brackege">Glass Brackege</label><br>
                    </div>
                </div>
            </div>
            <button type="button" class="add_mfg_button" data-product-index="${productFormCount}">Add Manufacturing Date</button>
            <hr>
        `;
        productFormsContainer.appendChild(newProductFormDiv);

        // Event listener for dynamically added MFG buttons and quantity update
        const newAddMfgButton = newProductFormDiv.querySelector('.add_mfg_button');
        const mfgContainer = newProductFormDiv.querySelector(`.mfg_details_container_${productFormCount}`);
        const newMfgQuantityInputs = newProductFormDiv.querySelectorAll(`.mfg-quantity-${productFormCount}`);

        if (newAddMfgButton) {
            newAddMfgButton.addEventListener('click', function() {
                const productIndex = this.dataset.productIndex;
                const currentMfgFormCount = mfgContainer.querySelectorAll('.mfg_form').length;
                const newMfgFormDiv = document.createElement('div');
                newMfgFormDiv.classList.add('mfg_form');
                newMfgFormDiv.innerHTML = `
                    <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date">Manufacturing Date:</label>
                    <input type="date" name="mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-mfg_date" class="mfg-date-${productIndex}" required>
                    <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-quantity">Quantity:</label>
                    <input type="number" name="mfg_details-${productIndex}-${currentMfgFormCount}-quantity" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-quantity" class="mfg-quantity-${productIndex}" min="1" required>

                    <div class="failure-options">
                        <label>Failure Type:</label><br>
                        <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting">
                        <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-complete_fitting">Complete Fitting</label><br>

                        <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure">
                        <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-driver_failure">Driver Failure</label><br>

                        <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel">
                        <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-led_pcb_panel">Led PCB/PANEL</label><br>

                        <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure">
                        <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-ip_failure">IP Failure</label><br>

                        <input type="checkbox" name="mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege" id="id_mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege">
                        <label for="id_mfg_details-${productIndex}-${currentMfgFormCount}-glass_brackege">Glass Brackege</label><br>
                    </div>
                `;
                mfgContainer.appendChild(newMfgFormDiv);
                const totalFormsInput = mfgContainer.querySelector(`#id_mfg_details-${productIndex}-TOTAL_FORMS`);
                if (totalFormsInput) {
                    totalFormsInput.value = currentMfgFormCount + 1;
                }
                updateMfgTotal(productIndex); // Update total after adding new row

                // Add event listener for the new quantity field
                const newlyAddedQuantityInput = newMfgFormDiv.querySelector(`.mfg-quantity-${productIndex}`);
                if (newlyAddedQuantityInput) {
                    newlyAddedQuantityInput.addEventListener('input', function() {
                        updateMfgTotal(productIndex);
                    });
                }
            });
        }

        if (newMfgQuantityInputs) {
            newMfgQuantityInputs.forEach(input => {
                input.addEventListener('input', function() {
                    updateMfgTotal(productFormCount);
                });
            });
        }

        productFormCount++;
    });
}