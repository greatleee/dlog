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
import DrinkList from './lists/DrinkList';
import SojuEmotionList from './lists/SojuEmotionList'; 
import SojuStatusList from './lists/SojuStatusList';
import { useRecordDispatch, useRecordState } from '../providers/RecordProvider';
import SelectedImageList from './lists/SelectedImageList';


const CreateRecordModal = () => {
  const state = useRecordState();
  const dispatch = useRecordDispatch();

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

  const onClick = () => {
    dispatch({ type: 'TOGGLE_CREATE_MODAL', show: false, date: new Date() });
  };

  const selectEmotionList = (value: string) => {

  };

  return (
    <IonModal isOpen={state.showCreateModal}>
      <IonApp>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={onClick}>
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
          <SojuEmotionList onSelect={selectEmotionList}/>
        </div>

        <div>
          <h1>마시고 나서 상태가 어땠오?</h1>
          <SojuStatusList onSelect={selectEmotionList}/>
        </div>

        <div>
          <h1>얼마나 마셨오?</h1>
          <DrinkList/>
        </div>

        <div>
          <h1>사진 있오?</h1>
          <SelectedImageList/>
        </div>

        <div>
          <h1>더 하고 싶은 말 있오?</h1>
        </div>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButton color="dlog" size="large" expand="block">작성완료</IonButton>
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
