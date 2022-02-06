/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import { useState } from 'react';


enum DrinkEnum {
  SOJU = '소주',
  BEER = '맥주',
};

enum DrinkUnitEnum {
  CUP = '잔',
  BOTTLE = '병'
};

type item = {
  type: DrinkEnum;
  amount: number|undefined;
  unit: DrinkUnitEnum;
};


const DrinkList = () => {
  const [list, setList] = useState<item[]>([
    {
      type: DrinkEnum.SOJU,
      amount: undefined,
      unit: DrinkUnitEnum.BOTTLE,
    },
    {
      type: DrinkEnum.BEER,
      amount: undefined,
      unit: DrinkUnitEnum.BOTTLE,
    },
  ]);

  const change = () => {

  };

  return (
    <IonList>
      {list.map((item, index) => (
        <IonItem>
          <IonLabel>{item.type}</IonLabel>
          <IonInput type="number" value={item.amount} onIonChange={change}/>
          <IonLabel>{item.unit}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default DrinkList;
