"use client";
import { Modal, message } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loader from "@/components/Loader";

const stripePromise = loadStripe(
  "pk_test_51O8AH0G8C5OebTxq8qKleqfGr0WhufCXs1ee8eW5Wb3G9OHjpUzeLXagt3Dg9b8n4XgVnikbQp4m06Ms7GxjQAhC00H6xG90Sd"
);

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: any;
  total: number;
}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  total,
}: CheckoutModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState("");

  const loadClientSecret = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/stripe_client_secret", {
        amount: total,
      });
      setClientSecret(res.data.clientSecret);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientSecret();
  }, []);
  return (
    <Modal
      title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: ${total}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}
    >
      {loading && <Loader />}
      <hr className="my-5" />
      <div className="mt-5">
        {stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
            }}
          >
            <CheckoutForm
              total={total}
              setShowCheckoutModal={setShowCheckoutModal}
            />
          </Elements>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal;