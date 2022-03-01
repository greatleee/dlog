import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import { useEffect } from 'react';
import useCalendar from '@veccu/react-calendar';
import styles from './Calendar.module.css';
import DateImage from './calendar/DateImage';
import { Record } from './CreateRecordModal';
import { useRecordDispatch, useRecordState } from '../providers/RecordProvider';
import { useRecordsDispatch, useRecordsState } from '../providers/RecordsContext';
import firestore from '../utils/firestore';


export type Records = {
  [key: number]: Record;
};

const Calendar: React.FC = () => {
  const { headers, body, navigation } = useCalendar();
  const recordState = useRecordState();
  const recordDispatch = useRecordDispatch();
  const recordsState = useRecordsState();
  const recordsDispatch = useRecordsDispatch();

  useEffect(() => {
    initCalendar();
    console.debug('Calendar 1');
  }, [recordsState.date]);

  useEffect(() => {
    if (!!recordState.isSubmitted) {
      console.debug('Calendar 2');
      loadRecords();
    }
  }, [recordState.isSubmitted]);

  const initCalendar = async () => {
    await loadRecords();
    navigation.setDate(recordsState.date);
  };

  const loadRecords = async () => {
    const records = await firestore.getMonthRecords(recordsState.date);
    if (!!records) {
      recordsDispatch({ type: 'SET_RECORDS', records });
    }
  };

  const clickDateImage = (dateValue: Date, record: Record|undefined) => {
    recordDispatch({
      type: 'TOGGLE_CREATE_MODAL',
      show: true,
      date: dateValue,
      record: record,
      isSubmitted: false,
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

                  <div onClick={clickDateImage.bind(null, value, recordsState.records?.[date])}>
                    <DateImage value={recordsState.records?.[date]?.status} />
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
