import { drawProducts, drawProducts_in_cart, darwTotal } from "./functions/draw.js";
import { handleAddCart, handleBuy, handleCartShow, handleOptionsCart, scrollWindow} from "./functions/handles.js";
import { getProducts} from "./functions/helpers.js";

async function main(){
    const db= {
        products: JSON.parse(localStorage.getItem('products')) ||(await getProducts()),
        cart:JSON.parse(localStorage.getItem('cart'))||{},
    };

    drawProducts(db);
    handleCartShow();
    handleAddCart(db);
    drawProducts_in_cart(db);
    handleOptionsCart(db);
    handleBuy(db);
    darwTotal(db);
    scrollWindow();
    var mixer = mixitup('.productos');
    mixer.filter('.category');
}

window.addEventListener("load", main) 