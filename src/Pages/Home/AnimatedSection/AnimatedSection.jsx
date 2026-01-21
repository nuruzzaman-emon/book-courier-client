import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaRegStar } from "react-icons/fa";
import { SiWikibooks } from "react-icons/si";
import { BsFillBoxFill, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

const AnimatedSection = ({ allDataCount }) => {
  const statsData = [
    {
      id: 1,
      title: "Total Users",
      valueKey: "users",
      icon: <FaUsers size={32} />,
    },
    {
      id: 2,
      title: "Total Books",
      valueKey: "books",
      icon: <SiWikibooks size={32} />,
    },
    {
      id: 3,
      title: "Total Orders",
      valueKey: "orders",
      icon: <BsFillBoxFill size={32} />,
    },
    {
      id: 4,
      title: "Successful Payments",
      valueKey: "payments",
      icon: <BsFillCreditCard2FrontFill size={32} />,
    },
    {
      id: 5,
      title: "Wishlist Adds",
      valueKey: "wishlist",
      icon: <AiFillHeart size={32} />,
    },
    {
      id: 6,
      title: "Total Reviews",
      valueKey: "reviews",
      icon: <FaRegStar size={32} />,
    },
  ];
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="my-10 shadow-2xl p-6">
      <div className="flex flex-col justify-center items-center  md:p-8">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          {" "}
          Platform at a Glance
        </h2>
        <p className="font-bold text-accent">
          {" "}
          A snapshot of users, books, and activity.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
        {statsData.map(({ id, title, valueKey, icon }) => (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ rotateY: [25, 0], transition: { duration: 0.2 } }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3, delay: id * 0.3 }}
            key={id}
            className="stat shadow-xl flex items-center justify-center"
          >
            <div>
              <div className="stat-title text-2xl font-bold">{title}</div>
              <div className="stat-value text-primary">
                {allDataCount?.[valueKey] ?? 0}
              </div>
              <div className="stat-desc">Till Now</div>
            </div>
            <div className="text-primary">{icon}</div>
          </motion.div>
        ))}
      </div>
      <motion.p
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className=" font-bold text-center mb-2 text-accent"
      >
        Figures shown for demonstration purposes.
      </motion.p>
    </div>
  );
};

export default AnimatedSection;
