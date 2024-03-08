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
  const [addPlayerBooking, setAddPlayerBooking] = useState({
    firstName: '',
    lastName: '',
    facility: '',
    pricingRule: '',
    facilityTitle: '',
    pricingRuleTitle: '',
  })
  const [loading, setLoading] = useState(false);


  return (
    <BookingContext.Provider value={{ bookingData, setBookingData,loading,setLoading, costValue, setCostValue,addPlayerBooking, setAddPlayerBooking}}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
