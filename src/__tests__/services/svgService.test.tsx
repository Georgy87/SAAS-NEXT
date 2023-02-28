import { svgService } from '@services/svgService';
import { ICompanies } from '@constants/types';

describe('SvgService', () => {
  let element: SVGSVGElement;
  describe('svgDrawHorizontal', () => {
    beforeEach(() => {
      element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    });
    it('should create rectangles and text elements for each company', () => {
      const companies: ICompanies[] = [
        { price: 10, color: 'red' },
        { price: 20, color: 'blue' },
        { price: 30, color: 'green' },
      ];

      svgService.svgDrawHorizontal(element, companies);

      const rectElements = element.querySelectorAll('rect');
      const textElements = element.querySelectorAll('text');

      expect(rectElements.length).toBe(companies.length);
      expect(textElements.length).toBe(companies.length);

      rectElements.forEach((rect, i) => {
        const company = companies[i];
        expect(rect.getAttribute('fill')).toBe(company.color);
        expect(rect.getAttribute('width')).toBe((company.price * 6).toString());

        const text = textElements[i] as SVGTextElement;
        expect(text.getAttribute('fill')).toBe(company.color);
        expect(text.getAttribute('x')).toBe((company.price * 6 + 35).toString());
        expect(text.textContent).toBe(`${String(company.price.toFixed(2))}$`);
      });
    });

    it('should create a line element at the bottom of the svg', () => {
      const companies: ICompanies[] = [
        { price: 10, color: 'red' },
        { price: 20, color: 'blue' },
        { price: 30, color: 'green' },
      ];

      svgService.svgDrawHorizontal(element, companies);

      const lineElement = element.querySelector('line');
      if (!lineElement) return;
      expect(lineElement.getAttribute('stroke')).toBe('#000');
      expect(lineElement.getAttribute('stroke-width')).toBe('3');
      expect(lineElement.getAttribute('x1')).toBe('0');
      expect(lineElement.getAttribute('x2')).toBe('0');
      expect(lineElement.getAttribute('y1')).toBe('0');
      expect(lineElement.getAttribute('y2')).toBe((element.clientHeight - 45).toString());
    });
  });

  describe('svgDrawVertical', () => {
    beforeEach(() => {
      element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    });
    it('should draw the rectangles and text correctly', () => {
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const companies = [
        { name: 'Company A', price: 20, color: '#FF0000' },
        { name: 'Company B', price: 30, color: '#00FF00' },
        { name: 'Company C', price: 40, color: '#0000FF' },
      ];
      const width = 800;

      svgService.svgDrawVertical(element, companies, { width });

      expect(element.children).toHaveLength(companies.length * 2 + 1);

      const rects = element.getElementsByTagName('rect');
      expect(rects).toHaveLength(companies.length);
      const padding: number = (width - companies.length * svgService.rectangleWidth) / (companies.length + 1);
      for (let i = 0; i < companies.length; i++) {
        expect(rects[i].getAttribute('y')).toBe((400 - companies[i].price * 4).toString());
        expect(rects[i].getAttribute('width')).toBe(svgService.rectangleWidth.toString());
        expect(rects[i].getAttribute('height')).toBe((companies[i].price * 4).toString());
        expect(rects[i].getAttribute('fill')).toBe(companies[i].color);
      }

      const texts = element.getElementsByTagName('text');
      expect(texts).toHaveLength(companies.length);

      for (let i = 0; i < companies.length; i++) {
        expect(texts[i].getAttribute('y')).toBe((400 - companies[i].price * 4 - 20).toString());
        expect(texts[i].getAttribute('fill')).toBe(companies[i].color);
        expect(texts[i].getAttribute('font-size')).toBe('12');
        expect(texts[i].getAttribute('text-anchor')).toBe('middle');
        expect(texts[i].textContent).toBe(`${String(companies[i].price.toFixed(2))}$`);
      }

      const line = element.lastElementChild as SVGLineElement;
      expect(line.tagName).toBe('line');
      expect(line.getAttribute('x1')).toBe('0');
      expect(line.getAttribute('y1')).toBe(element.clientHeight.toString());
      expect(line.getAttribute('x2')).toBe(element.clientWidth.toString());
      expect(line.getAttribute('y2')).toBe(element.clientHeight.toString());
      expect(line.getAttribute('stroke')).toBe('#000');
      expect(line.getAttribute('stroke-width')).toBe('3');
    });
  });
});
