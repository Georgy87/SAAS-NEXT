'use client';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { backblaze, bunny, scaleway, vultr } from '@constants/company';
import { useWindowSize } from '@hooks/useWindowSize';
import { createChartsData } from '@utils/createChartsData';
import { priceCalculationService } from '@services/priceСalculationService';
import { screens } from '@constants/screens';
import { BackblazeIcon } from '@components/Icons/BackblazeIcon';
import { BunnyIcon } from '@components/Icons/BunnyIcon';
import { ScalewayIcon } from '@components/Icons/Scaleway';
import { VultrIcon } from '@components/Icons/Vultr';
import { Input } from '@components/Input/Input';
import { svgService } from '@services/svgService';

import styles from './Companies.module.scss';

type PropsType = {
  storage: number;
  transfer: number;
};

export const Companies: FC<PropsType> = ({ storage, transfer }) => {
  const [checkedHdd, setCheckedHdd] = useState<boolean>(true);
  const [checkedSsd, setCheckedSsd] = useState<boolean>(false);
  const [checkedMulti, setCheckedMulti] = useState<boolean>(true);
  const [checkedSingle, setCheckedSingle] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const { width } = useWindowSize();

  const onChangeCheckedHdd = () => {
    setCheckedHdd(true);
    setCheckedSsd(false);
  };

  const onChangeCheckedSsd = () => {
    setCheckedHdd(false);
    setCheckedSsd(true);
  };

  const onChangeCheckedMulti = () => {
    setCheckedMulti(true);
    setCheckedSingle(false);
  };

  const onChangeCheckedSingle = () => {
    setCheckedMulti(false);
    setCheckedSingle(true);
  };

  const isDiskSystemStoragePrice = useMemo(
    () => (checkedSsd ? bunny.storagePrice.ssd : bunny.storagePrice.hdd),
    [checkedHdd, checkedSsd]
  );

  const isStorageLimitPrice = useMemo(
    () => priceCalculationService.getStorageLimitPrice(storage, checkedMulti, scaleway),
    [storage, checkedMulti, checkedSingle]
  );

  const isTransferLimitPrice = useMemo(
    () => priceCalculationService.getTransferLimitPrice(transfer, scaleway),
    [transfer]
  );

  const backblazePrice = useMemo(
    () => priceCalculationService.getBackblazePrice(storage, transfer, backblaze),
    [storage, transfer]
  );

  const bunnyPrice = useMemo(
    () => priceCalculationService.getBunnyPrice(storage, transfer, bunny, isDiskSystemStoragePrice),
    [storage, transfer, isDiskSystemStoragePrice]
  );

  const scalewayPrice = useMemo(
    () => priceCalculationService.getScalewayPrice(storage, transfer, isTransferLimitPrice, isStorageLimitPrice),
    [storage, transfer, isTransferLimitPrice, isStorageLimitPrice]
  );

  const vultrPrice = useMemo(
    () => priceCalculationService.getVultrPrice(storage, transfer, vultr),
    [storage, transfer]
  );

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;
    const company = createChartsData(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice);

    width < screens.screenWidth960
      ? svgService.svgDrawVertical(svgElement, company, { width: 500 })
      : svgService.svgDrawHorizontal(svgElement, company);

    if (width <= screens.screenWidth414) {
      svgElement.width.baseVal.value = 300;
      svgService.svgDrawVertical(svgElement, company, { width: svgElement.width.baseVal.value });
    }
  }, [storage, transfer, checkedMulti, checkedSingle, checkedHdd, checkedSsd, width, svgRef]);

  const companies = () => {
    return (
      <div className={styles.companies}>
        <ul className={styles.companiesList}>
          <li>
            <span className={styles.companyName}>backblaze</span>
            <BackblazeIcon />
          </li>
          <li>
            <span className={styles.companyName}>bunny</span>
            <BunnyIcon />
            <div className={styles.customInputsBlock}>
              <div className={styles.options}>
                <label htmlFor="hdd">hdd</label>
                <Input
                  type="checkbox"
                  id="hdd"
                  data-testid={'hdd'}
                  onChange={onChangeCheckedHdd}
                  checked={checkedHdd}
                />
              </div>
              <div className={styles.optionsEnd}>
                <label htmlFor="ssd">ssd</label>
                <Input
                  type="checkbox"
                  id="ssd"
                  data-testid={'ssd'}
                  onChange={onChangeCheckedSsd}
                  checked={checkedSsd}
                />
              </div>
            </div>
          </li>
          <li>
            <span className={styles.companyName}>scaleway</span>
            <ScalewayIcon />
            <div className={styles.customInputsBlock}>
              <div className={styles.options}>
                <label htmlFor="multy">multy</label>
                <Input
                  type="checkbox"
                  id="multy"
                  data-testid={'multy'}
                  onChange={onChangeCheckedMulti}
                  checked={checkedMulti}
                />
              </div>
              <div className={styles.optionsEnd}>
                <label htmlFor="single">single</label>
                <Input
                  type="checkbox"
                  id="single"
                  data-testid={'single'}
                  onChange={onChangeCheckedSingle}
                  checked={checkedSingle}
                />
              </div>
            </div>
          </li>
          <li>
            <span className={styles.companyName}>vultr</span>
            <VultrIcon />
          </li>
        </ul>
      </div>
    );
  };

  const charts = () => {
    return (
      <div className={styles.chartsContainer}>
        <svg ref={svgRef} width="500" height="400">
        </svg>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        {companies()}
        {charts()}
      </>
    );
  };

  return <div className={styles.companiesContainer}>{renderContent()}</div>;
};
