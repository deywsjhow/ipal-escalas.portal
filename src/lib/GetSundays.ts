import { startOfMonth, endOfMonth, eachDayOfInterval, isSunday, format, addMonths } from 'date-fns';



export function GetSundaysFormReactSelect(){

    const start = startOfMonth(new Date());
    const nextThreeMonths = addMonths(start, 3);        
    const daysOfMonth = eachDayOfInterval({ start: start, end: nextThreeMonths }); 
    const sundays = daysOfMonth.filter(day => isSunday(day)); // Filtra apenas os domingos
  
    return sundays.map(sunday => ({
        value: format(sunday, 'yyyy-MM-dd'),
        label: format(sunday, 'dd/MM/yyyy'),
      })); // Mapeia os domingos para o formato do react-select
}


export function GetSundays3MonthsNoReactSelect() {
  const start = startOfMonth(new Date()); 
  const endOfThirdMonth = addMonths(start, 2); 
  const end = endOfMonth(endOfThirdMonth); 

  format(start, 'yyyy-MM-dd')
  format(end, 'yyyy-MM-dd')
  
  return { start, end };
}

export function GetSundays2MonthsNoReactSelect() {
  const start = startOfMonth(new Date()); 
  const endOfThirdMonth = addMonths(start, 1); 
  const end = endOfMonth(endOfThirdMonth); 

  format(start, 'yyyy-MM-dd')
  format(end, 'yyyy-MM-dd')
  
  return { start, end };
}