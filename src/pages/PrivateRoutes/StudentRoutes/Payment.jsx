import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  const { state: classDetails } = useLocation();

  return (
    <div className="container my-12">
      <Helmet>
        <title>Payment | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          Purchase Course
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-2">{classDetails?.name}</h4>
            <h1 className="text-4xl font-semibold mb-6">
              $ {classDetails?.price}
            </h1>
            <img
              src={classDetails?.image}
              alt=""
              className="w-3/4 rounded-lg"
            />
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm classDetails={classDetails} />
            </Elements>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Payment;
