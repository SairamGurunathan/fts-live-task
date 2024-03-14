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
  const [addPlayerBooking, setAddPlayerBooking] = useState([]);
  const [pricingRuleId, setPricingRuleId] = useState([]);
  const [isTableDataEdit, setIsTableDataEdit] = useState({
    isEdit : false,
  });

console.log(isTableDataEdit);
console.log(isTableDataEdit.pricingRule);
  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, costValue, setCostValue,addPlayerBooking, setAddPlayerBooking,pricingRuleId, setPricingRuleId,isTableDataEdit, setIsTableDataEdit}}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
