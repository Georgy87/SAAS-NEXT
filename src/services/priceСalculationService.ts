import { IPriceCalculationService } from './types';
import { Backblaze, Bunny, Scaleway, Vultr } from '@/constants/types';

class PriceCalculationService implements IPriceCalculationService {
  public getBackblazePrice(storage: number, transfer: number, backblaze: Backblaze) {
    const { storagePrice, transferPrice, minPayment } = backblaze;

    const currentStoragePrice = storage * storagePrice;
    const currentTransferPrice = transfer * transferPrice;
    const sumPrices = currentStoragePrice + currentTransferPrice;
    const resultPrice = minPayment > sumPrices ? minPayment : sumPrices;
    return storage !== 0 ? resultPrice : 0;
  }
  public getBunnyPrice(storage: number, transfer: number, bunny: Bunny, isDiskSystemStoragePrice: number) {
    const { transferPrice, maxPayment } = bunny;
    const storagePrice = isDiskSystemStoragePrice;

    const currentStoragePrice = storage * storagePrice;
    const currentTransferPrice = transfer * transferPrice;
    const sumPrices = currentStoragePrice + currentTransferPrice;
    const resultPrice = sumPrices > maxPayment ? maxPayment : sumPrices;
    return storage !== 0 ? resultPrice : 0;
  }
  public getScalewayPrice(storage: number, transfer: number, isTransferLimitPrice: number, isStorageLimitPrice: number) {
    const storagePrice = isStorageLimitPrice;
    const transferPrice = isTransferLimitPrice;

    const currentStoragePrice = (storage - 75) * storagePrice;
    const currentTransferPrice = (transfer - 75) * transferPrice;
    const sumPrices = currentStoragePrice + currentTransferPrice;
    const resultPrice = sumPrices;
    return storage !== 0 ? resultPrice : 0;
  }
  public getVultrPrice(storage: number, transfer: number, vultr: Vultr) {
    const { storagePrice, transferPrice, minPayment } = vultr;

    const currentStoragePrice = storage * storagePrice;
    const currentTransferPrice = transfer * transferPrice;
    const sumPrices = currentStoragePrice + currentTransferPrice;
    const resultPrice = minPayment > sumPrices ? minPayment : sumPrices;
    return storage !== 0 ? resultPrice : 0;
  }
  public getStorageLimitPrice(storage: number, checkedMulti: boolean, scaleway: Scaleway) {
    const { multy, single } = scaleway.storagePrice;
    const multiPrice = storage < 75 ? multy.free : multy.overLimit;
    const singlePrice = storage < 75 ? single.free : single.overLimit;
    return checkedMulti ? multiPrice : singlePrice;
  }
  public getTransferLimitPrice(transfer: number, scaleway: Scaleway) {
    const { free, overLimit } = scaleway.transferPrice;
    return transfer < 75 ? free : overLimit;
  }
}

export const priceCalculationService = new PriceCalculationService();
