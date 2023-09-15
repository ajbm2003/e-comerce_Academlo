import { exit_card } from "./handles.js";

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
        const iconAdd = quantity ? `<button class='bx bxs-cart-add' id="${id}"></button>` : `<button class='bx bx-no-entry' id="${id}"></button>`
        html += `<div class="product mix ${category}">
                    <div class="product_img"> 
                        <img src='${image}'/> 
                    </div>
                    <div class ="product_info">
                        <h3>
                        <p>${name}
                        <br> 
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

export function drawPoruductCard(db){
    let botonMostrar = document.querySelector(".productos");
    const superposicion = document.querySelector(".card_show");

    botonMostrar.addEventListener("click", (e) => {
        const producto = e.target.parentElement.querySelector(".bx");

    if (superposicion.style.display === "flex") {
        superposicion.style.display = "none";
    } else {
        if(producto.classList.contains('bxs-cart-add') || producto.classList.contains('bx-no-entry')){
            superposicion.style.display = "flex";

            const id = Number(producto.id);
            let productFound = db.products.find((product) => product.id === id);
            console.log(productFound)
            let card= "";

                card+=`
                <i class='bx bxs-x-circle'></i>
                <div class="product_card mix ${productFound.category}">
                <div class="card_product_img"> 
                    <img src='${productFound.image}'/> 
                </div>
                <div class ="card_product_info">
                    <h3>
                    <p>${productFound.name}
                    <br> 
                        ${productFound.price}.0 USD <strong>${productFound.quantity} units</strong>
                    </p>
                </div>
            </div> `;

            document.querySelector(".product_window").innerHTML = card;
            exit_card();
            
        }
    }

});
}


