import { motion } from "motion/react";
import React, { useState } from "react";
import {
  FaBookOpen,
  FaLock,
  FaRecycle,
  FaStar,
  FaTruck,
  FaWallet,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaTruck className="text-4xl text-white" />,
    title: "Fast & Reliable Delivery",
    desc: "Your books deserve safe hands and timely arrival. BookCourier ensures careful packaging and dependable delivery so every order reaches your doorstep on schedule and in perfect condition.",
    bg: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    icon: <FaBookOpen className="text-4xl text-white" />,
    title: "Wide Book Collection",
    desc: "Discover a diverse collection of books across all genres, from academic resources to best-selling novels. BookCourier makes it easy to find the perfect book for every reader, anytime.",
    bg: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: <FaLock className="text-4xl text-white" />,
    title: "Secure Payments",
    desc: "Shop with complete confidence using our secure and trusted payment system. BookCourier protects your personal and financial information while offering multiple safe payment options for a smooth checkout experience.",
    bg: "from-sky-500 via-blue-600 to-indigo-600",
  },
  {
    icon: <FaStar className="text-4xl text-white" />,
    title: "Trusted by Readers",
    desc: "Thousands of readers trust BookCourier for quality books and reliable service. With positive reviews and high ratings, we continue to deliver experiences that readers love and recommend.",
    bg: "from-yellow-400 via-orange-500 to-amber-500",
  },
  {
    icon: <FaWallet className="text-4xl text-white" />,
    title: "Affordable Pricing",
    desc: "BookCourier offers competitive prices and regular discounts, making it easy to enjoy your favorite reads without overspending. Quality books, amazing deals, and happy wallets!",
    bg: "from-green-400 via-lime-500 to-emerald-500",
  },
  {
    icon: <FaRecycle className="text-4xl text-white" />,
    title: "Eco-Friendly Packaging",
    desc: "We use minimal and recyclable packaging to protect both your books and the planet. BookCourier ensures your reading journey is safe, stylish, and environmentally responsible.",
    bg: "from-teal-400 via-cyan-500 to-sky-500",
  },
];

// Parent variants for staggering cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WhyFromUs = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="rounded-2xl shadow-2xl mt-20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Why Choose BookCourier?
        </h2>
        <p className="mt-2  text-neutral font-bold">
          More than just a bookstore — we deliver knowledge with care.
        </p>
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative"
      >
        {/* Show big H2 before hover */}
        {!hovered && (
          <div className="min-h-[50vh] shadow-2xl flex items-center justify-center">
            <motion.h2
              initial={{ scale: 1.5, rotate: 15, opacity: 0.7 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              className=" text-2xl md:text-4xl font-extrabold text-center bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent my-10 "
            >
              Just Hover and See!
            </motion.h2>
          </div>
        )}

        {/* Cards container */}
        {hovered && (
          <motion.div
            className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-2xl p-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`relative overflow-hidden rounded-2xl p-6 text-center bg-linear-to-br ${card.bg} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {card.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed relative z-10">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WhyFromUs;
