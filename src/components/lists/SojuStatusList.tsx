/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonImg } from '@ionic/react';
import { useEffect, useState } from 'react';
import basic from '../../assets/images/soju/basic.svg';
import dizzy from '../../assets/images/soju/dizzy.svg';
import vomit from '../../assets/images/soju/vomit.svg';
import blackout from '../../assets/images/soju/blackout.svg';


export enum SojuStatusEnum {
  BASIC = 'BASIC',
  DIZZY = 'DIZZY',
  VOMIT = 'VOMIT',
  BLACKOUT = 'BLACKOUT',
};


const SojuStatusList = ({ value, onSelect }: { value: SojuStatusEnum|undefined, onSelect: Function }) => {
  const [list, setList] = useState([
    {
      src: basic,
      value: SojuStatusEnum.BASIC,
      isSelected: false,
    },
    {
      src: dizzy,
      value: SojuStatusEnum.DIZZY,
      isSelected: false,
    },
    {
      src: vomit,
      value: SojuStatusEnum.VOMIT,
      isSelected: false,
    },
    {
      src: blackout,
      value: SojuStatusEnum.BLACKOUT,
      isSelected: false,
    },
  ]);

  useEffect(() => {
    select(value);
  }, [value])

  const getImgStyle = (isSelected: boolean) => {
    return css`
      ${imgBaseStyle}
      opacity: ${isSelected ? 1 : 0.3};
    `;
  };

  const select = (value: SojuStatusEnum|undefined) => {
    setList(
      list.map((item, index) => 
        item.value === value ? { ...item, isSelected: true } : { ...item, isSelected: false }
      )
    );
    onSelect(value);
  };

  return (
    <ul css={imgListStyle}>
      {list.map((item, index) => (
        <li key={index}>
          <IonImg
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, item.value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SojuStatusList;


const imgBaseStyle = css`
  height: 100%;
  object-fit: cover;
`;

const imgListStyle = css`
  height: 150px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
`;
