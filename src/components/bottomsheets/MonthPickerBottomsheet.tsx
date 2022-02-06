/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonButton, IonContent, IonDatetime, IonModal } from '@ionic/react';


type Props = {
  isOpen: boolean;
  datetime: string;
  changeYearMonth: Function;
  dismiss: Function;
};


const MonthPickerBottomsheet: React.FC<Props> = ({isOpen, datetime, changeYearMonth, dismiss}) => {
  return (
    <IonModal css={modalStyle} isOpen={isOpen} onWillDismiss={() => dismiss()}>
      <IonContent>
        <div css={header}>
          <IonButton color="dlog" onClick={() => dismiss()}>완료</IonButton>
        </div>

        <IonDatetime
          css={datetimeStyle}
          value={datetime}
          presentation="month-year"
          onIonChange={e => changeYearMonth(e.detail.value)}
        />
      </IonContent>
    </IonModal>
  );
};

export default MonthPickerBottomsheet;


const modalStyle = css`
  --border-radius: 30px;
  --height: 40%;
  align-items: flex-end;
`;

const header = css`
  padding: 10px 20px 10px 10px;
  display: flex;
  justify-content: flex-end;
  border-radius: 30px;
`;

const datetimeStyle = css`
  max-width: unset;
  width: 100%;
`;
