import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import './CheckoutForm.css'

const CheckoutForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get("classId");
  const classData = JSON.parse(queryParams.get("classData"));
  const instructorEmail = classData.instructorEmail;
  const className = classData.className;
  const status = classData?.Status;
  const availableSeats = parseInt(classData.availableSeats);
  const enrolledStudents = parseInt(classData?.enrolledStudents || 0);

  console.log("seat std ", availableSeats, enrolledStudents);
  console.log("seat std ", typeof(availableSeats), typeof(enrolledStudents));

  // console.log(queryParams);
  const navigate = useNavigate();
  const price = parseInt(classData.price);

  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const [cardError, SetCardError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const [succeeded, setSucceeded] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log("client", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);
    console.log(card);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      SetCardError(error.message);
       console.log(error.message);
    } else {
      SetCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    // setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      SetCardError(confirmError);
    }

    console.log( paymentIntent);
    // setProcessing(true);
    if (paymentIntent.status == "succeeded") {
      setSucceeded(
        `${paymentIntent.id}`
      );
      const transactionId = paymentIntent.id;
      ///payments information saved in database

      const paymentInfo = {
        Date: new Date().toLocaleString(),
        email: user?.email,
        transaction_id: transactionId,
        pay: paymentIntent.amount,
        created: paymentIntent.created,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
      console.log(paymentInfo)
      
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        //td
        if (res.acknowledged) {
          console.log("payment post")

        }
      });
      
      const successfullyData = { ...classData, ...paymentInfo };
      console.log(successfullyData);
      
      axiosSecure
      .delete(`/select/classes/${classId}`)
      .then((res) => {
           console.log("deleted class", res.data);
          //TODO
        });

      //  ---- remove class

      axiosSecure
        .post("/payments/successfully", successfullyData)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.acknowledged);
          if (res.data.acknowledged) {
            // toast.success(
            //   `${user.displayName} your payment has been successfully completed`
            // );
            setProcessing(true);
            console.log(succeeded);
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Payment Successful!",
              text: succeeded,
              showConfirmButton: false,
              timer: 2500,
          });
            // navigate('/dashboard/selectedClasses');
          }
          else{
            toast.error(
              `${user.displayName}, Error in payment! Try Again.`
            );
          }
          //TODO
          
        });

      axiosSecure.patch("/classes/all-up", { classId, instructorEmail, className, status , availableSeats, enrolledStudents}).then((res) => {
        console.log("class all up", res.data);
        // TODO:
      });
    }
  };

  return (
    <div className="mt-6 border-2 dark:bg-cyan-800 bg-cyan-500">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-warning mt-5 btn-sm px-6"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
          <Toaster></Toaster>
        </button>
      </form>
      {cardError && <p className="text-red-500 text-2xl p-4 text-center">{cardError}</p>}
      {succeeded && <div>
        <p className="text-lime-200 text-2xl p-4 text-center">Payment Completed Successfully.</p>
        <p className="text-lime-200 text-xl p-4 text-center"> Your Transaction Id :<span className="text-red-400"> {succeeded}</span></p>
      </div> }
    </div>
  );
};

export default CheckoutForm;
