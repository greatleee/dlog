/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonIcon, IonImg } from '@ionic/react';
// import { Camera } from '@capacitor/camera';
import { addOutline, closeOutline } from 'ionicons/icons';
import { BaseSyntheticEvent, useRef, useState } from 'react';


const SelectedImageList = () => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'].join(', ');
  const imageInput = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<string[]>([]);

  const click = () => {
    imageInput?.current?.click();
  };

  const choose = async (e: BaseSyntheticEvent) => {
    console.debug(e);
    console.debug(e?.target?.files);
    const files = [...e?.target?.files];
    const images = files?.map((file: any) => URL.createObjectURL(file));
    console.debug(images);
    setList([
      ...images,
      ...list,
    ]);
    // try {
    //   const result = await Camera.pickImages({ width: 800 });
    //   const images = result.photos.map(photo => photo.webPath);
    //   setList([
    //     ...images,
    //     ...list,
    //   ]);
    // } catch (error) {
    //   console.debug(error);
    // }
  };

  const remove = (removeIndex: number) => {
    setList(list.filter((image, index) => index !== removeIndex));
  };

  return (
    <ul css={styles.list}>
      <li css={styles.li} key={-1} onClick={click}>
        <input
          ref={imageInput}
          type="file"
          accept={allowedExtensions}
          multiple
          css={styles.input}
          onChange={choose}
        />
        <IonIcon icon={addOutline} css={styles.addButton}/>
      </li>
      {list?.map((item, index) => (
        <li css={styles.li} key={index}>
          <IonIcon icon={closeOutline} css={styles.removeButton} onClick={remove.bind(null, index)}/>
          <IonImg src={item} css={styles.img}/>
        </li>
      ))}
    </ul>
  );
};

export default SelectedImageList;


const styles = {
  list: css`
    height: 150px;
    padding: 0;
    display: flex;
    list-style: none;
    white-space: nowrap;
    overflow-x: auto;
  `,
  li: css`
    width: 150px;
    height: 150px;
    flex: 0 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--ion-color-step-200);
    border-radius: 4px;

    :not(:last-of-type) {
      margin-right: 8px;
    }
  `,
  input: css`
    display: none;
  `,
  addButton: css`
    color: white; 
    width: 70px;
    height: 70px;
  `,
  removeButton: css`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 4px;
    right: 4px;
    color: white;
    background-color: black;
    border-radius: 100%;
  `,
  img: css`
    width: 99%;
    height: 99%;
    object-fit: cover;
    border-radius: 4px;
  `,
};
