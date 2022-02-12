import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import { useEffect, useState } from 'react';
import useCalendar from '@veccu/react-calendar';
import styles from './Calendar.module.css';
import DateImage from './calendar/DateImage';
import { Record } from './CreateRecordModal';
import { getMonthRecords } from './modals/storage';
import { useRecordDispatch, useRecordState } from '../providers/RecordProvider';


type CalendarProps = {
  date?: Date;
};

type Records = {
  [key: number]: Record;
};

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const { headers, body, navigation } = useCalendar();
  const state = useRecordState();
  const dispatch = useRecordDispatch();

  const [records, setRecords] = useState<Records|null>();

  useEffect(() => {
    if (date) navigation.setDate(date);
  }, [date]);

  useEffect(() => {
    loadRecords();
  }, [date, state.showCreateModal]);

  const loadRecords = async () => {
    if (date) {
      const yyyyMM = format(date, 'yyyyMM', { locale });
      const records = await getMonthRecords(yyyyMM);
      setRecords(records);
    }
  };

  const clickDateImage = (dateValue: Date, record: Record|undefined) => {
    dispatch({
      type: 'TOGGLE_CREATE_MODAL',
      show: true,
      date: dateValue,
      record: record,
    });
  };

  return (
    <table className={ styles.table }>
      <thead>
        <tr>
          {headers.weekDays.map(({key, value}) => (
            <th key={ key }>
              { format(value, 'E', { locale }) }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.value.map(({ key, value: days }) => (
          <tr key={ key }>
            {days.map(({ key, date, value, isCurrentDate, isCurrentMonth }) => (
              <td key={ key }>
                { isCurrentMonth && <div className={ styles.item }>
                  <div className={styles.day}>
                    <div className={ isCurrentDate ? styles.today : '' }>{ date }</div>
                  </div>

                  <div onClick={clickDateImage.bind(null, value, records?.[date])}>
                    <DateImage value={records?.[date]?.emotion} />
                  </div>
                </div> }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Calendar.defaultProps = {
  date: new Date(),
};

export default Calendar
