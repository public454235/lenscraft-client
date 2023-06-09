import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useTheme from "../../../hooks/useTheme";

const CheckoutForm = ({ classDetails }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { _id, price, classId } = classDetails;
  const navigate = useNavigate();

  const secureAxios = useSecureAxios();

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      setError(null);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) throw new Error(error.message);

      const res = await secureAxios.post("create-payment-intent", {
        price: Number(price),
      });

      if (res.data?.clientSecret) {
        Swal.fire({
          icon: "info",
          title: "Confirm payment?",
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const clientSecret = res.data.clientSecret;
            const { error, paymentIntent } = await stripe.confirmCardPayment(
              clientSecret,
              {
                payment_method: {
                  card,
                  billing_details: {
                    name: user.displayName,
                    email: user.email,
                  },
                },
              }
            );

            if (error) throw new Error(error.message);
            if (paymentIntent && paymentIntent.status === "succeeded") {
              const res = await secureAxios.post("save-payment-info", {
                _id,
                classId,
                email: user.email,
                paymentAmount: price,
                transactionId: paymentIntent.id,
              });
              if (res.data?.result.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Payment successful",
                  timer: 2000,
                  showConfirmButton: false,
                });
              }
              navigate("/dashboard/my-enrolled-classes");
            }
          }
        });
      } else throw new Error("Something wrong!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered focus:outline-none"
          defaultValue={user?.displayName}
          readOnly
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="email"
          className="input input-bordered focus:outline-none"
          defaultValue={user?.email}
          readOnly
        />
      </div>
      <div className="form-control">
        <label className="label pb-0">
          <span className="label-text">Card Information</span>
        </label>
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: theme === "dark" ? "#eee" : "999999",
              "::placeholder": {
                color: theme === "dark" ? "lightgray" : "darkgray",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="text-center mt-4">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-gradient w-full disabled:text-white"
        >
          {loading ? <span className="loading loading-spinner"></span> : "Pay"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
