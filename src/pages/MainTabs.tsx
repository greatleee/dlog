import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { calendar, addCircle, settings } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Tab1 from './Tab1';
import Tab3 from './Tab3';
import { useRecordDispatch } from '../providers/RecordProvider';
import { useRecordsState } from '../providers/RecordsContext';

const MainTabs: React.FC = () => {
  const dispatch = useRecordDispatch();
  const recordsState = useRecordsState();

  const openCreateRecordModal = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const yesterday = today;

    dispatch({
      type: 'TOGGLE_CREATE_MODAL',
      show: true,
      date: yesterday,
      record: recordsState.records?.[yesterday.getDate()],
      isSubmitted: false,
    });
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={calendar} />
          <IonLabel>월간캘린더</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2">
          <IonIcon icon={addCircle} onClick={openCreateRecordModal} />
          <IonLabel>기록하기</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={settings} />
          <IonLabel>설정</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default MainTabs;
