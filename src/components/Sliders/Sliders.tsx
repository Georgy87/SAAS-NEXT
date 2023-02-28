'use client';
import { ChangeEvent, FC } from 'react';

import { Input } from '@components/Input/Input';

import styles from './Sliders.module.scss';

type PropsType = {
  storage: number;
  transfer: number;
  onChangeStorage: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTransfer: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Sliders: FC<PropsType> = ({ storage, transfer, onChangeStorage, onChangeTransfer }) => {
  return (
    <div className={styles.slidersContainer}>
      <div className={styles.sliders}>
        <div className={styles.storage}>
          <div className={styles.textBlock}>
            <span>Storage: </span>
            <span data-testid={"text-storage"}>{storage} GB</span>
          </div>

          <Input
            type="range"
            min="0"
            max="1000"
            data-testid={"input-storage"}
            value={storage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStorage(e)}
          />
        </div>

        <div className={styles.storage}>
          <div className={styles.textBlock}>
            <span>Transfer: </span>
            <span data-testid={"text-transfer"}>{transfer} GB</span>
          </div>

          <Input
            type="range"
            min="0"
            max="1000"
            data-testid={"input-transfer"}
            value={transfer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeTransfer(e)}
          />
        </div>
      </div>
    </div>
  );
};
