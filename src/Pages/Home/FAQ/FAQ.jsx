import React from "react";
import { motion } from "framer-motion";
const faqs = [
  {
    question: "How long does book delivery take?",
    answer:
      "Delivery usually takes 2-5 working days depending on your location.",
  },
  {
    question: "Which areas do you cover for delivery?",
    answer:
      "We currently deliver to all major cities and districts across the country.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you will receive a tracking ID to monitor delivery status.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Yes, all payments are encrypted and processed through secure payment gateways.",
  },
  {
    question: "What if my book is damaged?",
    answer:
      "If your book arrives damaged, you can request a replacement within 48 hours.",
  },
];

const faqVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  return (
    <div className="my-10 shadow-2xl p-6">
      <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-3 my-8">
        {faqs.map((faq, i) => (
          <motion.div
            variants={faqVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            key={i}
            tabIndex={0}
            className="collapse collapse-arrow bg-base-100 border-base-300 border"
          >
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
