import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);

const Payment = () => {
  const [payPrice, setPayPrice] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get("price");

    setPayPrice(parseFloat(price));
  }, [location]);


  // console.log(price);

  return (
    <div>
      <Helmet>
        <title>Payment | Champion's Development academy</title>
      </Helmet>
      <h1 className="text-2xl dark:text-white uppercase font-semibold text-center">
        please make payment
      </h1>
      <div className="w-full">
        <Elements stripe={stripePromise}>

          <CheckoutForm price={payPrice}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;