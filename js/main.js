//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#cart-close");

let cartBtn = document.querySelector(".shop-item-button");

//카트열기
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

cartBtn.onclick = () =>{
    cart.classList.add("active");
};

//카드닫기
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//카트 동작 js
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded' , ready)
}else{
    ready();
}

//function
function ready(){
    //물건 카트에 제거
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    //수량 체인지
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
        updatetotal();
    }

    //카트에 추가
    var addCart  = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addToCartClicked);
    }

    //구매하기 버튼
    document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

//구매하기
function buyButtonClicked(){
    alert("주문되었습니다.")
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//물건 카트로부터 제거
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}



function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText;
    var price = shopItem.getElementsByClassName('product-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('product-img')[0].src;
    // console.log(title, price, imageSrc)
    addProductToCart(title, price, imageSrc);
    updatetotal();
}

function addProductToCart(title, price, imageSrc){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    // for (var i = 0; i < cartItemsNames.length; i++) {
    //     if (cartItemsNames[i].innerText == title) {
    //         alert("장바구니에 이미 담겨있어요!");
    //         return;
    //     }
     
        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText == title) {
                alert('장바구니에 이미 담겨있어요!');
                return;
            }
        // for (var i = 0; i < cartItemNames.length; i++) {
        //     if (cartItemNames[i].innerText == title) {
        //         alert('This item is already added to the cart')
        //         return
        //     }
        
        
   

    var cartBoxContent = `


								<img src= ${imageSrc} alt="" class="cart-img">
								<div class="detail-box">
									<div class="cart-product-title">
                                    ${title}</div>
									<div class="cart-price">
                                    ${price}
									</div>
									<input type="number" value="1" class="cart-quantity">
								</div>
								<!-- remove Cart -->
								<i class='bx bx-trash cart-remove'></i>
                             
                               
							`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}
}

//수량 체인지
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//update total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox =  cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
         // 숫자 3자리 콤마찍기
         Number.prototype.formatNumber = function(){

            if(this==0) return 0;

            let regex = /(^[+-]?\d+)(\d)/;

            let nstr = (this + '');

            while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');

            return nstr;

        };
        // total = total.toFixed(2);
        //if price contain some cents value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
       

}