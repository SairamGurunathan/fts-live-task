import { createContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    facility: '',
    pricingRule: '',
    facilityTitle: '',
    pricingRuleTitle: '',
  });
  const [costValue, setCostValue] = useState('');

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, costValue, setCostValue}}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
