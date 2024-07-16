export const GetFullDate = (date:Date)=>{
    const yy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();
    return `${yy}${mm}${dd}`;
  }