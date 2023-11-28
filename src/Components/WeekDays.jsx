// import React from 'react'

// const WeekDays = () => {
//     const weekdays = [
//         { fullName: 'Sunday', halfName: 'Sun', index: 0 },
//         { fullName: 'Monday', halfName: 'Mon', index: 1 },
//         { fullName: 'Tuesday', halfName: 'Tue', index: 2 },
//         { fullName: 'Wednesday', halfName: 'Wed', index: 3 },
//         { fullName: 'Thursday', halfName: 'Thu', index: 4 },
//         { fullName: 'Friday', halfName: 'Fri', index: 5 },
//         { fullName: 'Saturday', halfName: 'Sat', index: 6 },
//       ];

//       const handleWeekDaysChange = (e) => {
//         if (e.target.checked) {
//           setAllChecked([...allchecked, e.target.value]);
//         } else {
//           setAllChecked(allchecked?.filter((item) => item !== e.target.value));
//         }
//       };
//     //   const selectedValuesString = allchecked?.toString();
    
//   return (
//     <>
//     <div className="d-flex flex-row gap-2">
//                     {weekdays?.map((day, index) => (
//                       <div className="d-flex gap-2" key={index}>
//                         <Form.Check
//                           onChange={handleWeekDaysChange}
//                           type="checkbox"
//                           value={day}
//                           checked={allchecked?.includes(day)}
//                         />
//                         <Form.Label>{day}</Form.Label>
//                       </div>
//                     ))}
//                   </div>
//     </>
//   )
// }

// export default WeekDays

import React, { useState } from 'react';
import { Form } from 'react-bootstrap'; // Assuming you are using Bootstrap for styling

const WeekDays = () => {
  const weekdays = [
    { fullName: 'Sunday', halfName: 'Sun', index: 0 },
    { fullName: 'Monday', halfName: 'Mon', index: 1 },
    { fullName: 'Tuesday', halfName: 'Tue', index: 2 },
    { fullName: 'Wednesday', halfName: 'Wed', index: 3 },
    { fullName: 'Thursday', halfName: 'Thu', index: 4 },
    { fullName: 'Friday', halfName: 'Fri', index: 5 },
    { fullName: 'Saturday', halfName: 'Sat', index: 6 },
  ];

  const [allChecked, setAllChecked] = useState([]);

  const handleWeekDaysChange = (e, day) => {
    if (e.target.checked) {
      setAllChecked([...allChecked, day]);
    } else {
      setAllChecked(allChecked.filter((item) => item !== day));
    }
  };

  return (
    <div className="d-flex flex-row gap-2">
      {weekdays.map((day, index) => (
        <div className="d-flex gap-2" key={index}>
          <Form.Check
            onChange={(e) => handleWeekDaysChange(e, day)}
            type="checkbox"
            value={day.index}
            checked={allChecked.includes(day)}
          />
          <Form.Label>{day.fullName}</Form.Label>
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
