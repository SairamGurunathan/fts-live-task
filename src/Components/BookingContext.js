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
    perHourCost: '',
  });
  const [costValue, setCostValue] = useState('');
  const [addPlayerBooking, setAddPlayerBooking] = useState([])

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, costValue, setCostValue,addPlayerBooking, setAddPlayerBooking}}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
