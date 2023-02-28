import { CANVAS_COLORS } from '@constants/canvas';
import { ICompanies } from '@constants/types';
import { createChartsData } from '@utils/createChartsData';

describe('createChartsData', () => {
  it('should return an array of companies with updated color based on the min price', () => {
    const backblazePrice = 10;
    const bunnyPrice = 5;
    const scalewayPrice = 7;
    const vultrPrice = 8;

    const expectedOutput: ICompanies[] = [
      {
        price: 10,
        color: CANVAS_COLORS.RECTANGLE,
      },
      {
        price: 5,
        color: CANVAS_COLORS.MIN_RECTTANGLE,
      },
      {
        price: 7,
        color: CANVAS_COLORS.RECTANGLE,
      },
      {
        price: 8,
        color: CANVAS_COLORS.RECTANGLE,
      },
    ];

    expect(createChartsData(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice)).toEqual(expectedOutput);
  });
});