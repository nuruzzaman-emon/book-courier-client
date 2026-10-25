import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const confirmationRequest = useRef({ sessionId: null, promise: null });
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) return;

    let active = true;
    if (confirmationRequest.current.sessionId !== sessionId) {
      confirmationRequest.current = {
        sessionId,
        promise: axiosSecure.patch("/payment-success", null, {
          params: { session_id: sessionId },
        }),
      };
    }

    confirmationRequest.current.promise
      .then(() => {
        if (active) setStatus("success");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [sessionId, axiosSecure]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loading />
        <p className="text-gray-600">Confirming your payment…</p>
      </div>
    );
  }

  if (!sessionId || status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <FaTimesCircle className="text-amber-500 text-7xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            We couldn’t confirm your payment
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment may have completed, but order confirmation failed. Check
            your orders or contact support before trying to pay again.
          </p>
          <Link
            to="/dashboard/my-orders"
            className="px-6 py-2 rounded-lg bg-primary text-white font-medium"
          >
            Check My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been completed
          successfully and your order is now being processed.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard/my-orders"
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/all-books"
            className="px-6 py-2 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
