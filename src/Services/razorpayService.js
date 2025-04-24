// services/razorpay.js

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  export const initializeRazorpayPayment = async ({
    amount,
    currency = 'INR',
    customerName,
    customerEmail,
    customerPhone,
    orderId,
    onSuccess,
    onError,
    theme = {
      color: '#F59E0B' // Amber color to match your UI
    }
  }) => {
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }
    
    // The amount should be in the smallest currency unit (paise for INR)
    const paymentAmount = amount * 100;
    
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_YOUR_TEST_KEY_HERE', // Use your test key
      amount: paymentAmount.toString(),
      currency,
      name: 'Gourmet Eats', // Your business name
      description: 'Food Delivery Order',
      order_id: orderId, // Generate this from your backend
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone
      },
      theme,
      handler: (response) => {
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          onError('Payment canceled by user');
        }
      }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };