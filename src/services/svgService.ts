import { ICompanies } from '@/constants/types';

import { ISVGService } from './types';

class SvgService implements ISVGService {
  readonly rectangleWidth = 50;
  readonly rectangleHeight = 50;
  readonly verticalPaddingRectangles = 125;
  readonly horizontalPaddingRectangles = 100;

  svgDrawHorizontal(element: SVGSVGElement, company: ICompanies[]) {
    const x = 0;
    let y = 0;

    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }

    for (let i = 0; i < company.length; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', (company[i].price * 6).toString());
      rect.setAttribute('height', this.rectangleHeight.toString());
      rect.setAttribute('fill', company[i].color);
      element.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text') as SVGTextElement;
      text.setAttribute('x', (company[i].price * 6 + 35).toString());
      text.setAttribute('y', (y + 25).toString());
      text.setAttribute('fill', company[i].color);
      text.setAttribute('font-size', '12');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = `${String(company[i].price.toFixed(2))}$`;
      element.appendChild(text);

      y += this.horizontalPaddingRectangles;
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '0');
    line.setAttribute('y2', (element.clientHeight - 45).toString());
    line.setAttribute('stroke', '#000');
    line.setAttribute('stroke-width', '3');
    element.appendChild(line);
  }

  svgDrawVertical(element: SVGSVGElement, company: ICompanies[], { width }: { width: number }) {
    const rectCount: number = company.length;
    const padding: number = (width - rectCount * this.rectangleWidth) / (rectCount + 1);

    let x = padding;
    let y = 400;

    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }

    for (let i = 0; i < rectCount; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', (y - company[i].price * 4).toString());
      rect.setAttribute('width', this.rectangleWidth.toString());
      rect.setAttribute('height', (company[i].price * 4).toString());
      rect.setAttribute('fill', company[i].color);
      element.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text') as SVGTextElement;
      text.setAttribute('x', (x + this.rectangleWidth / 2).toString());
      text.setAttribute('y', (y - company[i].price * 4 - 20).toString());
      text.setAttribute('fill', company[i].color);
      text.setAttribute('font-size', '12');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = `${String(company[i].price.toFixed(2))}$`;
      element.appendChild(text);

      x += this.rectangleWidth + padding;
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', `${element.clientHeight}`);
    line.setAttribute('x2', `${element.clientWidth}`);
    line.setAttribute('y2', `${element.clientHeight}`);
    line.setAttribute('stroke', '#000');
    line.setAttribute('stroke-width', '3');
    element.appendChild(line);
  }
}

export const svgService = new SvgService();
