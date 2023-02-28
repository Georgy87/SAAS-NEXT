'use client';
import { ChangeEvent, useState } from 'react';

import { Companies } from '@components/Companies';
import { Sliders } from '@components/Sliders';

import styles from './MainPage.module.scss';

export const HomePage = () => {
  const [storage, setStorage] = useState<number>(1000);
  const [transfer, setTransfer] = useState<number>(1000);

  const onChangeStorage = (e: ChangeEvent<HTMLInputElement>) => {
    setStorage(+e.target.value);
  };

  const onChangeTransfer = (e: ChangeEvent<HTMLInputElement>) => {
    setTransfer(+e.target.value);
  };

  return (
    <div className={styles.root}>
      <Sliders
        storage={storage}
        transfer={transfer}
        onChangeStorage={onChangeStorage}
        onChangeTransfer={onChangeTransfer}
      />
      <Companies storage={storage} transfer={transfer} />
    </div>
  );
};

export default HomePage;