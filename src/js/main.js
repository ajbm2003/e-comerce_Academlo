async function getProducts(){
    try {
        const BASE_URL= "https://ecommercebackend.fundamentos-29.repl.co/"
        const response = await fetch(BASE_URL);
        const products = await response.json(); 
        return products;
    } catch (error) {
        console.log(error);
    }
}

function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

async function drawProducts(db){
    let html = '';

    for (const {id, category, image, name, price, quantity} of db.products){
        html += `<div class="product">
                    <div class="product_img"> 
                        <img src='${image}'/> 
                    </div>
                    <div class ="product_info">
                        <h3>${name} | <span>${category}</span></h3>
                        <p>
                            ${price}.0 USD <strong>${quantity} units</strong>
                        </p>
                        <button class='bx bxs-cart-add' id="${id}"></button>
                    </div>
                </div> `;
    }
    
    document.querySelector(".productos").innerHTML = html;
}

function handleCartShow(){
    const icon_cart = document.querySelector('.bx-cart');
    const icon_exit = document.querySelector('.bx-exit');
    const cart = document.querySelector('.cart');
    icon_cart.addEventListener("click", function(){
        cart.classList.toggle('cart--show')
    })
    icon_exit.addEventListener("click", function(){
        cart.classList.toggle('cart--show')
    })
}

function drawProducts_in_cart(db){
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
}

function handleAddCart(db){
    document.querySelector('.productos').addEventListener("click", (e) => {
        if(e.target.classList.contains('bxs-cart-add')){
            const id = Number(e.target.id);

            let productFound = db.products.find((product) => product.id === id);

            if(db.cart[id]){
                if(db.cart[id].amount === db.cart[id].quantity)
                    return alert("No hay más en stock"); 
                db.cart[id].amount +=1
            }else{
                db.cart[id] ={
                    ...productFound,
                    amount:1
                }
            }

            setLocalStorage("cart", db.cart);
            drawProducts_in_cart(db);
        }
    });
}


async function main(){
    const db= {
        products: await getProducts(),
        cart:JSON.parse(localStorage.getItem('cart'))||{},
    };

    drawProducts(db);
    handleCartShow();
    handleAddCart(db);
    drawProducts_in_cart(db);

    document.querySelector(".cart_products").addEventListener("click", (e) => {
        if(e.target.classList.contains('bx-plus')){
            const id = Number(e.target.parentElement.id);
            if(db.cart[id].amount === db.cart[id].quantity)
              return alert("No hay más en stock");   
            
            db.cart[id].amount += 1; 
            
        }

        if(e.target.classList.contains('bx-minus')){
            const id = Number(e.target.parentElement.id);
            if(db.cart[id].amount === 1){
                delete db.cart[id];
            }else
                db.cart[id].amount -= 1; 
        
        }
        if(e.target.classList.contains('bxs-trash')){
            const id = Number(e.target.parentElement.id);
            delete db.cart[id]; 
            
        }

        setLocalStorage("cart",db.cart)
        drawProducts_in_cart(db);
    });
}

window.addEventListener("load", main) 