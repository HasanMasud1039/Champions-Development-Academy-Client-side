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
      <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-semibold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />make Payment</h1>

      <div className="w-full">
        <Elements stripe={stripePromise}>

          <CheckoutForm price={payPrice}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;