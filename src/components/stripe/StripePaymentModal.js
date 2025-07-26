// // components/StripePaymentModal.js
// "use client";

// import { useState } from "react";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button } from "@/components/ui/button";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// function CheckoutForm({ userId, onClose }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     // 1. Create PaymentIntent on backend
//     const res = await fetch(`http://localhost:5000/payment/${userId}/pay-intent`, {
//       method: "POST",
//     });
//     const { clientSecret } = await res.json();

//     // 2. Confirm payment with card details
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     setLoading(false);

//     if (result.error) {
//       alert(`Payment failed: ${result.error.message}`);
//     } else if (result.paymentIntent.status === "succeeded") {
//       alert("Payment successful!");
//       onClose();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <CardElement className="border p-2 rounded-md" />
//       <Button type="submit" className="w-full" disabled={loading || !stripe}>
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </form>
//   );
// }

// export default function StripePaymentModal({ isOpen, onClose, userId }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-lg font-bold mb-4">Complete Payment</h2>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm userId={userId} onClose={onClose} />
//         </Elements>
//         <Button variant="ghost" className="mt-4 w-full" onClick={onClose}>
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }
