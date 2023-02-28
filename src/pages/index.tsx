'use client';
import { ChangeEvent, useState } from 'react';
import Head from 'next/head';

import { Companies } from '@components/Companies';
import { Sliders } from '@components/Sliders';

import styles from '../styles/MainPage.module.scss';

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
    <main className={styles.root}>
      <Head>
        <title>TEST TASK</title>
      </Head>
      <Sliders
        storage={storage}
        transfer={transfer}
        onChangeStorage={onChangeStorage}
        onChangeTransfer={onChangeTransfer}
      />
      <Companies storage={storage} transfer={transfer} />
    </main>
  );
};

export default HomePage;
