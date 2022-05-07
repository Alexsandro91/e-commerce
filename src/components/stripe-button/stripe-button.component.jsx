import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IFgcVGg7GNYsTwamwQfvt5J13EP4Z8fkFDCnAmJYfPEJ8PjDdKCjJ6b7FblaidE4FNHkxbcA2q5Gx39tl9KcJnJ00s9Lt1XHe';

    const onToken = token => {
        console.log(token);
        alert('Payment successfull')
    };

    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'E-Commerce Clothing AA'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = { `Your total is $${price}` }
            amount = { priceForStripe }
            panelLabel = 'Pay Now'
            token = { onToken }
            stripeKey = { publishableKey }
        />
    );
}

export default StripeCheckoutButton;