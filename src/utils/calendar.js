import dayjs from "dayjs";
import ja from "dayjs/locale/ja"

dayjs.locale(ja)

export const createCalender = ( month = dayjs().month(), year = dayjs().year() ) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  //テーブル表示のための前月の取得
  for( let i = 0; i < firstDateOfMonth.day(); i++ ) {
    arrayOfDate.push({ 
      date: firstDateOfMonth.day(i),
      currentMonth: false,
    });
  }

  //当月の取得
  for( let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++ ) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today: 
        firstDateOfMonth.date(i).toDate().toDateString() === 
        dayjs().toDate().toDateString(),
    });
  }

  //6 * 7(6週分)のための42
  const nextMonthDays = 42 - arrayOfDate.length

  //テーブル表示のための翌月の取得
  for ( let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + nextMonthDays; i++ ) {
    arrayOfDate.push({
      date: lastDateOfMonth.date(i),
      currentMonth: false,
    });
  }

  return arrayOfDate;
}