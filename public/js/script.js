// Show Alert

const showAlert = document.querySelector("[show-alert]");

if(showAlert){
  const dataTime = showAlert.getAttribute("data-time");
  // console.log(dataTime);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, dataTime);

  const closeAlert = showAlert.querySelector("[close-alert]");

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}

// End Show Alert

// Button Buy

const buyNowButton = document.querySelectorAll(".btn-buy-now");

if(buyNowButton.length> 0){
  buyNowButton.forEach(button => {
    button.addEventListener("click", () => {
      const ticketId = button.getAttribute("ticketId");
      const newStock = button.getAttribute("currentStock") - 1;

      const isConfirm = confirm("Bạn có muốn mua vé không!");
      if(isConfirm){
        fetch(`/order/create/${ticketId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({newStock})
        })
        const box = button.closest(".product-item");
        const innerStock = box.querySelector(".inner-stock");
        // console.log(innerStock)
        innerStock.innerHTML = "Số lượng còn lại: " + newStock;
        // console.log(box);
        alert("Đặt vé thành công vui lòng vào order để xác nhận!");
      }
    })
  })
}

// End Button Buy


// Button Cancel Ticket 

const buttonCancels = document.querySelectorAll(".button-cancel");
if(buttonCancels.length > 0){
  buttonCancels.forEach(button => {
    button.addEventListener("click", () => {
      const ticketId = button.getAttribute("ticketId");
      const stock = button.getAttribute("stock");
      const orderId = button.getAttribute("orderId");
      const isConfirm = confirm("Bạn có muốn hủy vé không!");
      if(isConfirm){
        fetch(`/order/cancel/${ticketId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({stock, orderId}),
        })

        alert("Hủy vé thành công!");
      }
    })
  })
}

// End Button Cancel Ticket

// Button Confirm Ticket

const buttonConfirm = document.querySelectorAll(".button-confirm");

if(buttonConfirm.length > 0){
  buttonConfirm.forEach(button => {
    button.addEventListener("click", () => {
      const ticketId = button.getAttribute("ticketId");
      const orderId = button.getAttribute("orderId");
      const price = button.closest("tr").querySelector("[ticket-price]").getAttribute("ticket-price");
      // console.log(ticketId);
      // console.log(orderId);
      // console.log(price);

      const isConfirm = confirm("Bạn có xác nhận đặt vé không ?");
      if(isConfirm){
        fetch(`/order/confirm/${ticketId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ticketId, orderId, price})
        })
        const balanceBox = document.querySelector(".inner-balance");
        const balance = balanceBox.getAttribute("balance");
        const newBalance = parseInt(balance) - price;
        balanceBox.innerHTML = newBalance;
      }
    })
  })
}

// End Button Confirm Ticket
