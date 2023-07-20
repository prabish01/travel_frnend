import React from "react";
import KhaltiCheckout from "khalti-checkout-web";


let config = {
  
  publicKey: process.env.KHALTI_PUBLIC_KEY,
  productIdentity: "23",
  productName: "productNaam",
  productUrl: "http://localhost:1337/en/manpower/cutting-costs-boosting-profits",
  eventHandler: {
    onSuccess(payload) {
      //api hit
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };
      axios
        .get(
          `https://mes.herokuapp.com/khalti/${data.token}/${data.amount}/${process.env.KHALTI_SECRET_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          alert("Thank you");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};


export default function Khalti() {
  let checkout = new KhaltiCheckout(config);

  return (
    <div>
      <button
        onClick={() => checkout.show({ amount: 20 })}
        className="bg-sky-400 p-5 text-black"
      >
        Pay
      </button>
    </div>
  );
}