import React from "react";
import { motion } from "motion/react";
import { FaSearch, FaShoppingCart, FaLock, FaTruck } from "react-icons/fa";

const processSteps = [
  {
    id: 1,
    title: "Browse Books",
    description: `Explore BookCourier’s wide selection of books across fiction, non-fiction, science, romance, and children’s categories. Discover popular titles, hidden gems, and trending releases with ease.`,
    icon: <FaSearch size={32} />,
  },
  {
    id: 2,
    title: "Place Order",
    description: `Select your favorite books and add them to your cart or wishlist. Review book details, quantities, and pricing before confirming your order.`,
    icon: <FaShoppingCart size={32} />,
  },
  {
    id: 3,
    title: "Secure Payment",
    description: `Complete your purchase using trusted and secure payment methods. BookCourier protects your personal and financial information with advanced security measures.`,
    icon: <FaLock size={32} />,
  },
  {
    id: 4,
    title: "Fast Delivery",
    description: `Once your order is confirmed, BookCourier ensures quick and reliable delivery to your doorstep. Every book is carefully packaged to prevent damage during transit.`,
    icon: <FaTruck size={32} />,
  },
];

const Process = () => {
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="shadow-2xl my-12 p-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Our Process
        </h2>
        <p className="text-para font-bold">
          Simple steps to get your favorite books delivered
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
        {processSteps.map((step) => (
          <motion.div
            key={step.id}
            variants={cardVariants}
            initial="hidden"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2, delay: step.id * 0.3 }}
            whileInView="visible"
            className=" shadow-xl p-8"
          >
            <span className="text-primary ">{step.icon}</span>
            <h2 className="text-xl font-bold mt-5">{step.title}</h2>
            <p className="text-neutral">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Process;
