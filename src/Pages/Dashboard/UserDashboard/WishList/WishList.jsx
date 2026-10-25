import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlist = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user-wishlist", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  const handleItemRemove = async (item) => {
    try {
      const res = await axiosSecure.delete(`/user-wishlist/${item._id}`);
      if (res.data.deletedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${item.bookName} removed from wishlist`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire("Could not remove book", error.message, "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">❤️ My Wishlist</h2>
        <p className="text-base-content/70 mt-2">
          Books you’ve saved for later
        </p>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto md:px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-primary text-primary-content">
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Price</th>
                    <th>Wished At</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {wishlist.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10">
                        <p className="text-lg text-base-content/60">
                          😔 Your wishlist is empty
                        </p>
                      </td>
                    </tr>
                  ) : (
                    wishlist.map((item, i) => (
                      <tr key={item._id} className="hover:bg-base-200 transition">
                        <th>{i + 1}</th>

                        <td>
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="mask mask-squircle h-14 w-14 shadow">
                                <img
                                  src={item.bookPhotoURL}
                                  alt={item.bookName}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-base-content">
                                <Link to={`/book-details/${item?.bookId}`}>
                                  <span className="font-bold hover:underline">
                                    {item.bookName}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="font-bold text-success">
                          ৳{item.price}
                        </td>

                        <td className="text-sm text-base-content/70">
                          {new Date(item.seenAt).toLocaleString()}
                        </td>

                        <td>
                          <button
                            onClick={() => handleItemRemove(item)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
