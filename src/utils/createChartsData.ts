import { CANVAS_COLORS } from '@constants/canvas';
import { ICompanies } from '@constants/types';

export const createChartsData = (
  backblazePrice: number,
  bunnyPrice: number,
  scalewayPrice: number,
  vultrPrice: number
): ICompanies[] => {
  const companies: ICompanies[] = [
    {
      price: backblazePrice,
      color: CANVAS_COLORS.RECTANGLE,
    },
    {
      price: bunnyPrice,
      color: CANVAS_COLORS.RECTANGLE,
    },
    {
      price: scalewayPrice,
      color: CANVAS_COLORS.RECTANGLE,
    },
    {
      price: vultrPrice,
      color: CANVAS_COLORS.RECTANGLE,
    },
  ];
  
  const minPrice = Math.min(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice);
  return companies.map((company: ICompanies) => {
    company.price === minPrice ? (company.color = CANVAS_COLORS.MIN_RECTTANGLE) : (company.color = CANVAS_COLORS.RECTANGLE);
    return company;
  });
};
