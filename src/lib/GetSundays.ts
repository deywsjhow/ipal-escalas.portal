import { startOfMonth, endOfMonth, eachDayOfInterval, isSunday, format, addMonths } from 'date-fns';



export default function GetSundays(){

        const start = startOfMonth(new Date());
        const nextThreeMonths = addMonths(start, 3);        
        const daysOfMonth = eachDayOfInterval({ start: start, end: nextThreeMonths }); 
        const sundays = daysOfMonth.filter(day => isSunday(day)); // Filtra apenas os domingos
      
        return sundays.map(sunday => ({
            value: format(sunday, 'yyyy-MM-dd'),
            label: format(sunday, 'dd/MM/yyyy'),
          })); // Mapeia os domingos para o formato do react-select
}