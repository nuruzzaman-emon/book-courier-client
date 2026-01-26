import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // change order status
  const handleStatusChange = async (id, newStatus) => {
    const updateData = { status: newStatus };
    axiosSecure.patch(`orders/${id}`, updateData).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your Ordered Has Been ${newStatus}`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
    console.log(id, newStatus);
  };

  // cancel order
  const handleCancelOrder = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/orders/${id}`, { status: "cancelled" });
      refetch();
      Swal.fire("Cancelled!", "Order has been cancelled.");
    }
  };

  return (
    <div className="md:p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2
          className="text-3xl md:text-5xl font-bold 
          bg-linear-to-r from-primary to-secondary 
          bg-clip-text text-transparent text-center my-3"
        >
          Orders Management
        </h2>
        <span className="badge badge-lg badge-primary my-2">
          Total: {orders.length}
        </span>
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold text-gray-400">
            No orders found 📦
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto rounded-xl shadow-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Buyer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-base-200 transition">
                  <td className="font-bold">{index + 1}</td>

                  <td>
                    <p className="font-semibold">{order.bookName}</p>
                  </td>

                  <td className="text-sm text-gray-500">
                    {order.customerName}
                  </td>

                  {/* Status */}
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`badge
                        ${order.status === "pending" && "badge-warning"}
                        ${order.status === "shipped" && "badge-info"}
                        ${order.status === "delivered" && "badge-success"}
                        ${order.status === "cancelled" && "badge-error"}
                      `}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="select select-bordered select-xs"
                        disabled={
                          order.status === "delivered" ||
                          order.status === "cancelled"
                        }
                      >
                        <option value={order.status} disabled>
                          {order.status}
                        </option>

                        {order.status === "pending" && (
                          <option value="shipped">Shipped</option>
                        )}

                        {order.status === "shipped" && (
                          <option value="delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                  </td>

                  {/* Action */}
                  <td>
                    {order.status !== "delivered" &&
                    order.status !== "cancelled" ? (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-xs btn-error btn-outline"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
