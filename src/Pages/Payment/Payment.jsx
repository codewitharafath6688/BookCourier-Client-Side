import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { LuBookImage } from "react-icons/lu";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${id}`);
      return res.data;
    },
  });
  const handlePay = async () => {
    const paymentInfo = {
        price: data.price,
        bookName: data.bookName,
        orderId: data._id,
        email: data.email,
        bookImage: data.bookImageUrl
    }
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
    console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <div className="ml-2 mt-3">
      <h2>
        Pay $ {data?.price} for book of{" "}
        <span className="font-bold">{data?.bookName}</span>
      </h2>
      <button onClick={handlePay} className="btn mt-3">
        Pay to procced
      </button>
    </div>
  );
};

export default Payment;
