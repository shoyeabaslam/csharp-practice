
  
  
  
  
export const GetDateRange = (date:Date) => {
    const prev = date.getDay(); // Days from Sunday (0) to the current day
    const next = 6 - date.getDay(); // Days from the current day to Saturday (6)
  
    let prevDate = new Date(date);
    let nextDate = new Date(date)
    if (prev !== 0 && next !== 0) {
      prevDate = new Date(date);
      prevDate.setDate(date.getDate() - prev);
  
      nextDate = new Date(date);
      nextDate.setDate(date.getDate() + next);
    
   
    } else if (prev === 0) {
      nextDate = new Date(date);
      nextDate.setDate(date.getDate() + next);
  
    } else {
      prevDate = new Date(date);
      prevDate.setDate(date.getDate() - prev);
  
    }
  
    return {
      fromDate:prevDate,
      toDate:nextDate
    }
  };
  