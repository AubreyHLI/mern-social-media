import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const calendarFormat = (date) => {
    const calendarDate = dayjs(date).calendar(null, {
        sameDay: '[今天] HH:mm', 
        nextDay: '[明天] HH:mm',
        lastDay: '[昨天] HH:mm',
        nextWeek: 'MM-DD [下]dddd HH:mm', 
        lastWeek: 'MM-DD dddd HH:mm', 
        sameElse: 'YYYY-MM-DD HH:mm' // Everything else ( 17/10/2011 )
    })
    return calendarDate;
}


export const calendarFormatBrif = (date) => {
    const formattedTime = dayjs(date);
    if(!dayjs().isSame(formattedTime, 'year') ) {
        return formattedTime.format('YYYY-MM-DD HH:mm');
    }
    const calendarDate = dayjs(date).calendar(null, {
        sameDay: 'HH:mm', 
        nextDay: '[明天] HH:mm',
        lastDay: '[昨天] HH:mm',
        nextWeek: '[下]dddd HH:mm', 
        lastWeek: 'dddd HH:mm', 
        sameElse: 'MM-DD HH:mm' // Everything else ( 17/10/2011 )
    })
    return calendarDate;
}


export default dayjs;
