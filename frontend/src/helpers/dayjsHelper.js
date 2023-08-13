import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const calendarFormat = (date) => {
    const calendarDate = dayjs(date).calendar(null, {
        sameDay: '[今天] hh:mm', 
        nextDay: '[明天] hh:mm',
        lastDay: '[昨天] hh:mm',
        nextWeek: 'YYYY/MM/DD hh:mm', 
        lastWeek: 'YYYY/MM/DD hh:mm', 
        sameElse: 'YYYY/MM/DD hh:mm' // Everything else ( 17/10/2011 )
    })
    return calendarDate;
}


export default dayjs;
