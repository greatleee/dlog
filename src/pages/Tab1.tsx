import {
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import MonthPickerBottomsheet from '../components/bottomsheets/MonthPickerBottomsheet';
import Calendar from '../components/Calendar';


const Tab1: React.FC = () => {
  const selectedDatetime = useRef(new Date().toISOString());
  const confirmedDatetime = useRef(new Date().toISOString());

  const [yearMonth, setYearMonth] = useState('');
  const [showBottomsheet, setShowBottomsheet] = useState(false);

  const [showToast, dismissToast] = useIonToast();

  useEffect(() => {
    confirm();
  }, []);

  const onChangeYearMonth = (value: string) => {
    selectedDatetime.current = value;
  };

  const confirm = () => {
    const date = new Date(selectedDatetime.current);
    const now = new Date();
    setShowBottomsheet(false);
    if (date.getFullYear() >= now.getFullYear() && date.getMonth() > now.getMonth()) {
      showToast({ message: '미래의 음주는 기록할 수 없오!', color: 'danger', duration: 2000 });
      return;
    }
    confirmedDatetime.current = selectedDatetime.current;
    setYearMonth(`${date.getFullYear()}년 ${date.getMonth() + 1}월`)
  };

  return (
    <>
      <IonPage>
        <IonHeader collapse="fade">
          <IonToolbar>
            <IonTitle>
              <IonChip onClick={() => setShowBottomsheet(true)}>
                { yearMonth }
                <IonIcon icon={caretDownOutline}/>
              </IonChip>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Calendar date={new Date(confirmedDatetime.current)}/>
        </IonContent>
      </IonPage>

      <MonthPickerBottomsheet
        isOpen={showBottomsheet}
        datetime={confirmedDatetime.current}
        changeYearMonth={onChangeYearMonth}
        dismiss={confirm}
      />
    </>
  );
};

export default Tab1;
