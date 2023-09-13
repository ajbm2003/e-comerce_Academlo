export async function getProducts(){
    try {
        const BASE_URL= "https://ecommercebackend.fundamentos-29.repl.co/"
        const response = await fetch(BASE_URL);
        const products = await response.json(); 
        return products;
    } catch (error) {
        console.log(error);
    }
}

export function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}