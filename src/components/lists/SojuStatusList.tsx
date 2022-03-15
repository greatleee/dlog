/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import basic from '../../assets/images/soju/basic.svg';
import good from '../../assets/images/soju/good.svg';
import dizzy from '../../assets/images/soju/dizzy.svg';
import vomit from '../../assets/images/soju/vomit.svg';
import blackout from '../../assets/images/soju/blackout.svg';


export enum SojuStatusEnum {
  BASIC = 'BASIC',
  GOOD = 'GOOD',
  DIZZY = 'DIZZY',
  VOMIT = 'VOMIT',
  BLACKOUT = 'BLACKOUT',
};

type SojuStatusImagesType = {
  [key: string]: string;
};

export const SojuStatusImages: SojuStatusImagesType = {
  BASIC: basic,
  GOOD: good,
  DIZZY: dizzy,
  VOMIT: vomit,
  BLACKOUT: blackout,
};

const SojuStatusList = ({ value, onSelect }: { value: SojuStatusEnum|undefined, onSelect: Function }) => {
  const [list, setList] = useState([
    {
      src: basic,
      value: SojuStatusEnum.BASIC,
      isSelected: false,
    },
    {
      src: good,
      value: SojuStatusEnum.GOOD,
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
          <img
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, item.value)}
            alt="status"
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
  height: 130px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
`;
