import { Backblaze, Bunny, ICompanies, Scaleway, Vultr } from '@/constants/types';

export interface IPriceCalculationService {
  getBackblazePrice(storage: number, transfer: number, backblaze: Backblaze): number;
  getBunnyPrice(storage: number, transfer: number, bunny: Bunny, isDiskSystemStoragePrice: number): number;
  getScalewayPrice(
    storage: number,
    transfer: number,
    isTransferLimitPrice: number,
    isStorageLimitPrice: number
  ): number;
  getVultrPrice(storage: number, transfer: number, vultr: Vultr): number;
  getStorageLimitPrice(storage: number, checkedMulti: boolean, scaleway: Scaleway): number;
  getTransferLimitPrice(transfer: number, scaleway: Scaleway): number;
}

export interface ISVGService {
  rectangleWidth: number;
  rectangleHeight: number;
  verticalPaddingRectangles: number;
  horizontalPaddingRectangles: number;
  svgDrawVertical(canvas: SVGSVGElement, company: ICompanies[], { width }: { width: number }): void;
  svgDrawHorizontal(canvas: SVGSVGElement, company: ICompanies[]): void;
}
