import { company } from '@mocks/companies';
import { ICompanies } from '@constants/types';
import { canvasService } from '@services/canvasService';
import { ICanvasService } from '@services/types';
import { CANVAS_COLORS } from '@constants/canvas';

describe('CANVAS SERVICE', () => {
  let myChart: ICanvasService;
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;
  let companies: ICompanies[];

  beforeEach(() => {
    myChart = canvasService;
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    companies = company;
  });

  it('should draw a horizontal bar chart', () => {
    if (!context) return;
    myChart.drawHorizontal(canvas, companies, context);
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
    expect(context.fillText).toHaveBeenCalledTimes(4);
    expect(context.fillRect).toHaveBeenCalledTimes(4);
    expect(context.beginPath).toHaveBeenCalled();
    expect(context.moveTo).toHaveBeenCalledWith(0, 0);
    expect(context.lineTo).toHaveBeenCalledWith(0, canvas.height - 45);
    expect(context.stroke).toHaveBeenCalled();
  });

  it('should draw a vertical bar chart', () => {
    let verticalPaddingRectangles = 125;
    let x = 37;
    const rectangleWidth = 50;
    const companies: ICompanies[] = [
      {
        price: 10,
        color: CANVAS_COLORS.MIN_RECTTANGLE,
      },
      {
        price: 20,
        color: CANVAS_COLORS.RECTANGLE,
      },
      {
        price: 30,
        color: CANVAS_COLORS.RECTANGLE,
      },
      {
        price: 40,
        color: CANVAS_COLORS.RECTANGLE,
      },
    ];

    if (!context) return;
    const fillTextSpy = jest.spyOn(context, 'fillText');
  
    const moveToSpy = jest.spyOn(context, 'moveTo');
    const lineToSpy = jest.spyOn(context, 'lineTo');
    const strokeSpy = jest.spyOn(context, 'stroke');

    myChart.drawVertical(canvas, companies, context);
    const fillRectSpy = jest.spyOn(context, 'fillRect');
    expect(fillTextSpy).toHaveBeenCalledTimes(4);

    expect(fillTextSpy).toHaveBeenCalledWith('10.00$', 62, 340);
    expect(fillTextSpy).toHaveBeenCalledWith('20.00$', 187, 300);
    expect(fillTextSpy).toHaveBeenCalledWith('30.00$', 312, 260);

    expect(fillRectSpy).toHaveBeenCalledTimes(4);

    expect(fillRectSpy).toHaveBeenCalledWith(x, canvas.height, rectangleWidth, -companies[0].price * 4);
    x += verticalPaddingRectangles;
    expect(fillRectSpy).toHaveBeenCalledWith(x, canvas.height, rectangleWidth, -companies[1].price * 4);
    x += verticalPaddingRectangles;
    expect(fillRectSpy).toHaveBeenCalledWith(x, canvas.height, rectangleWidth,  -companies[2].price * 4);

    expect(moveToSpy).toHaveBeenCalledTimes(1);
    expect(moveToSpy).toHaveBeenCalledWith(canvas.width, canvas.width - 100);
    expect(lineToSpy).toHaveBeenCalledTimes(1);
    expect(lineToSpy).toHaveBeenCalledWith(0, canvas.width - 100);

    expect(strokeSpy).toHaveBeenCalledTimes(1);
  });
});
