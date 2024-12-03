// src/Payments/pay1.js

import cashfree from "./utils";

const pay = (paymentSessionId) => {
  const checkoutOptions = {
    paymentSessionId,
    returnUrl: "http://localhost:3000",
    notifyUrl: "https://38af-110-235-232-141.ngrok-free.app/api/webhook"
  };

  return cashfree.checkout(checkoutOptions)
    .then(result => {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirecting to payment gateway...");
      }
      return result;
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again later.');
      throw error;
    });
};

export default pay;
