import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const [paymentInfo, setPaymentInfo] = useState({});
  const isCalled = useRef(false);
  useEffect(() => {
    if (!sessionId || isCalled.current) return;
    isCalled.current = true;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2>Payment Successfully done.</h2>
      <p>Transaction ID: {paymentInfo.transactionId}</p>
      <p>Tracking ID: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
