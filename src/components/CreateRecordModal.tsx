/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { format } from 'date-fns';
import locale from 'date-fns/locale/ko';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import DrinkList from './lists/DrinkList';
import SelectedImageList from './lists/SelectedImageList';
import SojuEmotionList, { SojuEmotionEnum } from './lists/SojuEmotionList'; 
import SojuStatusList, { SojuStatusEnum } from './lists/SojuStatusList';
import { createRecord } from './modals/storage';
import { useRecordDispatch, useRecordState } from '../providers/RecordProvider';


export type Record = {
  emotion: SojuEmotionEnum|undefined,
  status: SojuStatusEnum|undefined,
};

const CreateRecordModal: React.FC = () => {
  const state = useRecordState();
  const dispatch = useRecordDispatch();

  const [record, setRecord] = useState<Record>({
    emotion: undefined,
    status: undefined,
  });

  const formatDate = (date: Date) => {
    const now = new Date();

    let postfix = '';
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
      if (date.getDate() === now.getDate() - 1) {
        postfix = ' (어제)';
      } else if (date.getDate() === now.getDate()) {
        postfix = ' (오늘)';
      }
    }
    return format(date, 'M월 d일 E요일', { locale }) + postfix;
  };

  const close = () => {
    dispatch({
      type: 'TOGGLE_CREATE_MODAL',
      show: false,
      date: new Date(),
      record: undefined,
    });
  };

  const selectEmotion = async (value: SojuEmotionEnum) => {
    await setRecord({
      ...record,
      emotion: value,
    });
  };

  const selectStatus = async (value: SojuStatusEnum) => {
    await setRecord({
      ...record,
      status: value,
    });
  };

  const submit = () => {
    const yyyyMM = format(state.createDate, 'yyyyMM', { locale });
    const d = format(state.createDate, 'd', { locale });
    createRecord(yyyyMM, d, record);
    dispatch({
      type: 'TOGGLE_CREATE_MODAL',
      show: false,
      date: new Date(),
      record: undefined,
    });
  };

  return (
    <IonModal isOpen={state.showCreateModal}>
      <IonApp>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={close}>
              <IonIcon icon={closeOutline}/>
            </IonButton>
          </IonButtons>
          <IonTitle>
            { formatDate(state.createDate) }
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent css={ styles.content } fullscreen={true}>
        <div>
          <h1>이 날 기분이 어땠오?</h1>
          <SojuEmotionList value={state.record?.emotion} onSelect={selectEmotion}/>
        </div>

        <div>
          <h1>마시고 나서 상태가 어땠오?</h1>
          <SojuStatusList value={state.record?.status} onSelect={selectStatus}/>
        </div>

        <div>
          <h1>얼마나 마셨오?</h1>
          <DrinkList/>
        </div>

        <div>
          <h1>사진 있오?</h1>
          <SelectedImageList/>
        </div>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButton color="dlog" size="large" expand="block" onClick={submit}>
            작성완료
          </IonButton>
        </IonToolbar>
      </IonFooter>
      </IonApp>
    </IonModal>
  );
};

export default CreateRecordModal;


const styles = {
  content: css`
    /* --padding-top: 16px; */
    --padding-start: 16px;
    --padding-bottom: 16px;
    --padding-end: 16px;
  `,
};
