/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonImg } from '@ionic/react';
import { useState } from 'react';
import basic from '../../assets/images/soju/basic.svg';
import vomit from '../../assets/images/soju/vomit.svg';
import blackout from '../../assets/images/soju/blackout.svg';


enum SojuStatusEnum {
  BASIC = 'BASIC',
  VOMIT = 'VOMIT',
  BLACKOUT = 'BLACKOUT',
};


const SojuStatusList = ({ onSelect }: { onSelect: Function }) => {
  const [list, setList] = useState([
    {
      src: basic,
      value: SojuStatusEnum.BASIC,
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

  const getImgStyle = (isSelected: boolean) => {
    return css`
      ${imgBaseStyle}
      opacity: ${isSelected ? 1 : 0.3};
    `;
  };

  const select = (selectedIndex: number) => {
    setList(
      list.map((item, index) => 
        index === selectedIndex ? { ...item, isSelected: true } : { ...item, isSelected: false }
      )
    );
    onSelect();
  };

  return (
    <ul css={imgListStyle}>
      {list.map((item, index) => (
        <li>
          <IonImg
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, index)}
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
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
`;
