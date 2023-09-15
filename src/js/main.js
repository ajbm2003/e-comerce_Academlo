import { drawProducts, drawProducts_in_cart, darwTotal , drawPoruductCard} from "./functions/draw.js";
import { handleAddCart, handleBuy, handleCartShow, handleOptionsCart, scrollWindow, filterProductos, darkMode} from "./functions/handles.js";
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
    darwTotal(db)
    filterProductos();
    scrollWindow();
    darkMode();
    drawPoruductCard(db);

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav_links').classList.toggle('active');
    });
}

window.addEventListener('load', function () {
    setTimeout(function () {
        document.querySelector('.loader-wrapper').style.display = 'none';
        main();
    }, 2000);
});