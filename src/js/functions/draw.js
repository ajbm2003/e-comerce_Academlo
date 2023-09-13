
export function darwTotal(db){
    const totalItems= document.querySelector("#totalItems");
    const totalMoney= document.querySelector("#totalMoney");
    
        let items = 0;
        let money = 0;
    
        for(const {amount, price} of Object.values(db.cart)){
            items += amount;
            money += amount * price;
        }
    
        totalItems.textContent =`${items} Items`;
        totalMoney.textContent = `Total ${money}.00 USD`
        document.querySelector('.total_products').textContent = items
}

export async function drawProducts(db){
    let html = '';

    for (const {id, category, image, name, price, quantity} of db.products){
        const iconAdd = quantity ? `<button class='bx bxs-cart-add' id="${id}"></button>` : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"/>
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg>`
        html += `<div class="product">
                    <div class="product_img"> 
                        <img src='${image}'/> 
                    </div>
                    <div class ="product_info">
                        <h3>${name} | <span>${category}</span></h3>
                        <p>
                            ${price}.0 USD <strong>${quantity} units</strong>
                        </p>
                        ${iconAdd}
                    </div>
                </div> `;
    }
    
    document.querySelector(".productos").innerHTML = html;
}

export function drawProducts_in_cart(db){
    let html = "";

    for (const {id, amount, image, price, name} of Object.values(db.cart)){
        html += `
            <div class="cart_product">
                <div class="cart_product_img">
                    <img src='${image}' alt= ''>
                </div>
                <div class="cart_product_info" id="${id}">
                    <div class="cart_product_info_text">    
                        <h4>${name}</h4>
                        <p><strong>Price=</strong>${price}.00 USD</p>   
                        <p><strong>Amount=</strong>${amount} units</p>
                    </div>
                    <button class='bx bx-plus'></button>
                    <button class='bx bx-minus'></button>
                    <button class='bx bxs-trash'></button>
                    <p><strong>Total=</strong> ${price * amount}.00 USD</p>
                </div>

            </div>
        `;
    }

    document.querySelector('.cart_products').innerHTML = html
    darwTotal(db);
}
