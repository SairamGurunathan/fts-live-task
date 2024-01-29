// export const getWeekDayFormat = (day)=>{
//     const weekdays = [
//         { fullName: 'sunday', halfName: 'Sun', index: 0 },
//         { fullName: 'monday', halfName: 'Mon', index: 1 },
//         { fullName: 'tuesday', halfName: 'Tue', index: 2 },
//         { fullName: 'wednesday', halfName: 'Wed', index: 3 },
//         { fullName: 'thursday', halfName: 'Thu', index: 4 },
//         { fullName: 'friday', halfName: 'Fri', index: 5 },
//         { fullName: 'saturday', halfName: 'Sat', index: 6 },
//       ];
    
//     const Days = day?.split(',')
//     const indices = weekdays.map((days,i)=>{
//       return days?.halfName === Days[i] ? days.index : ""})
//     const result = indices?.filter((index)=> typeof index === "number").map((d,ind)=>{
//    return (d===ind)?true:false
//     });
//       return result?.includes(false)||result.length===1?day:`${Days[0]}-${Days[Days?.length-1]}`;
//   }

export const getWeekDayFormat = (day) => {
  const weekdays = [
    { fullName: 'Sunday', halfName: 'Sun', index: 0 },
    { fullName: 'Monday', halfName: 'Mon', index: 1 },
    { fullName: 'Tuesday', halfName: 'Tue', index: 2 },
    { fullName: 'Wednesday', halfName: 'Wed', index: 3 },
    { fullName: 'Thursday', halfName: 'Thu', index: 4 },
    { fullName: 'Friday', halfName: 'Fri', index: 5 },
    { fullName: 'Saturday', halfName: 'Sat', index: 6 },
  ];

  const Days = day?.toLowerCase()?.split(',').map((d) => d.trim());
  if (Days?.length === 1) {
    return day;
  }
  const indices = Days?.map((day) => weekdays?.find((w) => w?.halfName?.toLowerCase() === day || w?.fullName?.toLowerCase() === day)?.index);
  const isContinuous = indices?.every((index, i, arr) => i === 0 || index === arr[i - 1] + 1);
  if (isContinuous) {
    return `${weekdays[indices[0]]?.halfName}-${weekdays[indices[indices?.length - 1]]?.halfName}`;
  } else {
    return day;
  }
};