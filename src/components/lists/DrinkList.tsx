import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { addCircleOutline, removeCircleOutline  } from 'ionicons/icons';
import { useEffect, useState } from 'react';


const asd = {
  SOJU: {
    key: 'SOJU',
    value: '소주',
  },
  BEER: {
    key: 'BEER',
    value: '맥주',
  },
};

export type Amounts = {
  [index: string]: number,
  SOJU: number,
  BEER: number,
};

const DrinkList = ({ amounts, onChange }: { amounts: Amounts|undefined, onChange: Function }) => {
  const [list, setList] = useState({
    [asd.SOJU.key]: 0,
    [asd.BEER.key]: 0,
  });

  useEffect(() => {
    if (amounts) setList(amounts);
  }, [amounts]);

  const add = (key: string) => {
    if (amounts) {
      onChange({
        ...amounts,
        [key]: amounts[key] + 1,
      });
    }
  };

  const remove = (key: string) => {
    const value = list[key] - 1;

    setList({
      ...list,
      [key]: value > 0 ? value : 0,
    });

    onChange(list);
  };
  
  return (
    <IonList>
      {Object.entries(asd).map(([key,  value]) => {
        return (<IonItem key={key}>
          <IonLabel>{value.value} {amounts?.[value.key]} 병</IonLabel>
          <IonIcon icon={addCircleOutline} onClick={add.bind(null, value.key)}/>
          <IonIcon icon={removeCircleOutline} onClick={remove.bind(null, value.key)}/>
        </IonItem>);
      })}
    </IonList>
  );
};

export default DrinkList;
