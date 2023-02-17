// open & close cart 
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

//장바구니 
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded' , start);
}else{
    start();
}

//====start===
function start(){
    addEvents();
}

//===update===
function update(){
    addEvents();
    updateTotal();
}

//===add events===
function addEvents(){
//카트에 물건 없애기
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns)
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

//물건 갯수 바꾸기
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })

//물건 카트에 담기
    let addCart_btns = document.querySelectorAll(".shop-item-button");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);
    });
}

//===handle event functions===
// function handle_addCartItem(){
//     let box = this.parentElement;
//     let title =  box.querySelector('.product-title').innerHTML;
//     let price =  box.querySelector('.product-price').innerHTML;
//     let imgSrc = box.querySelector('.product-img').src;
    
//     console.log(title, price, imgSrc);

//     updateTotal();

function handle_addCartItem() {
    let shopItem = this.parentElement;
    let title = shopItem.getElementsByClassName('.product-title').innerHTML;
    var price = shopItem.getElementsByClassName('.product-price').innerHTML;
    let imageSrc = shopItem.getElementsByClassName('.product-img').src;

    console.log(title, price, imageSrc);
    let newToAdd = {
        title,
        price,
        imageSrc
    
    };

   
}


    //물건 카트에 추가
    let cartBoxElement = CartBoxComponent("title", "price", "imageSrc");

    let newNode =  document.createElement("div");

    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);



function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value =  Math.floor(this.value); 

    update();
}

// =====update & rerender functions ===== 
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("₩", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    //
    total = total.toFixed(3);

    //total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "₩" + total;

}

//===html components===
function CartBoxComponent(title, price, imageSrc){
    return `
    <div class="cart-box">
    <img src= ${imageSrc} alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">
            ${price}
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>
</div>
 `;

}
