import { setLocalStorage } from "./helpers.js";
import { darwTotal, drawProducts_in_cart, drawProducts } from "./draw.js";

export function handleCartShow(){
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

export function handleAddCart(db){
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
            darwTotal(db);
        }
    });
}

export function handleOptionsCart(db){
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
                const response = confirm("Seguro quieres eliminar este producto?");
                if(!response) return;
                delete db.cart[id];
            }else
                db.cart[id].amount -= 1; 
        
        }
        if(e.target.classList.contains('bxs-trash')){
            const id = Number(e.target.parentElement.id);
            const response = confirm("Seguro quieres eliminar este producto?");
            if(!response) return;
            delete db.cart[id]; 
            
        }

        setLocalStorage("cart",db.cart);
        drawProducts_in_cart(db);
    });
}

export function handleBuy(db){
    document.querySelector(".btn_buy").addEventListener("click", (e) =>{
        
        if(Object.values(db.cart).length === 0){
            return alert('Primero seleciona algo en tu carrito.');
        }

        const response = confirm('Seguro quieres realizar tu compra?')
        
        if (!response) return;

        let newProducts = [];

        for(const product of db.products){
            if(db.cart[product.id]){
                newProducts.push({
                    ...product,
                    quantity: product.quantity - db.cart[product.id].amount
                })
            }else{
                newProducts.push(product);
            }
        }

        db.products = newProducts;
        db.cart= {};
        setLocalStorage("products", db.products);
        setLocalStorage("cart", db.cart);

        drawProducts_in_cart(db);
        drawProducts(db);

    });
}

export function scrollWindow(){
    let isScrolled = false;

    function handleScroll() {
      const scrollY = window.scrollY;
    
      if (scrollY > 200) {
        if (!isScrolled) {
        let header = document.querySelector("header");
          header.style.backgroundColor = "whitesmoke";
          header.style.transition= "1s ease-in-out";
          header.style.boxShadow= "0 1rem 1rem rgba(0, 0, 0, .15)";
          isScrolled = true; 
        
        }
      } else {
        if (isScrolled) {
            let header = document.querySelector("header");
            header.style.backgroundColor = "transparent";
            header.style.boxShadow= "none"
            isScrolled = false;
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll);
}