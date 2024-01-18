export const getWeekDayFormat = (day)=>{
    const weekdays = [
        { fullName: 'sunday', halfName: 'Sun', index: 0 },
        { fullName: 'monday', halfName: 'Mon', index: 1 },
        { fullName: 'tuesday', halfName: 'Tue', index: 2 },
        { fullName: 'wednesday', halfName: 'Wed', index: 3 },
        { fullName: 'thursday', halfName: 'Thu', index: 4 },
        { fullName: 'friday', halfName: 'Fri', index: 5 },
        { fullName: 'saturday', halfName: 'Sat', index: 6 },
      ];
    
    const Days = day?.split(',')
    const indices = weekdays.map((days,i)=>{
      // console.log(days?.halfName , Days[i] )
      return days?.halfName === Days[i] ? days.index : ""})
    const result = indices.filter((index)=> typeof index === "number").map((d,ind)=>{
   return (d===ind)?true:false
    });
    // console.log(result?.includes(false),result,Days,indices);
    
    // const indices = Days?.map((selectedDay)=>{
    //   const trimmedDay = selectedDay?.trim();
    //   return weekdays?.findIndex((weekday)=>weekday?.halfName === trimmedDay || weekday?.fullName === trimmedDay)
    // })

    // if (indices?.length === 1) {
    //   const firstIndex = indices[0];
    //   const matchingWeekday = weekdays?.find((weekday) => weekday?.index === firstIndex);
  
    //   if (matchingWeekday) {
    //     return matchingWeekday?.halfName;
    //   }
    // }
    
    // if (indices?.length > 0 ) {
    //   const firstIndex = indices[0];
    //   const matchingWeekdayFirst  = weekdays?.find((weekday) => weekday?.index === firstIndex);
    //   const lastIndex = indices[indices?.length - 1];
    // const matchingWeekdayLast = weekdays?.find((weekday) => weekday?.index === lastIndex);
  
      return result?.includes(false)||result.length===1?day:`${Days[0]}-${Days[Days?.length-1]}`;
    
    // }
  }