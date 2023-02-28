import { fireEvent, render } from '@testing-library/react';

import { Companies } from '@components/Companies';

describe('COMPANIES', () => {
  let canvas: HTMLCanvasElement;
  beforeEach(() => {
    canvas = document.createElement('canvas');
  });
  it('should checked checkbox-hdd and checkbox-ssd', () => {
    const { getByTestId } = render(<Companies storage={100} transfer={200} />);
    const hddCheckbox = getByTestId('hdd') as HTMLInputElement;
    const ssdCheckbox = getByTestId('ssd') as HTMLInputElement;

    expect(hddCheckbox.checked).toBe(true);
    fireEvent.click(hddCheckbox);
    expect(hddCheckbox.checked).toBe(true);

    expect(ssdCheckbox.checked).toBe(false);
    fireEvent.click(ssdCheckbox);
    expect(ssdCheckbox.checked).toBe(true);
    fireEvent.click(ssdCheckbox);
    expect(ssdCheckbox.checked).toBe(true);
    expect(hddCheckbox.checked).toBe(false);
  });
  it('should checked checkbox-multy and checkbox-single', () => {
    const { getByTestId } = render(<Companies storage={100} transfer={200} />);
    const hddCheckbox = getByTestId('multy') as HTMLInputElement;
    const ssdCheckbox = getByTestId('single') as HTMLInputElement;

    expect(hddCheckbox.checked).toBe(true);
    fireEvent.click(hddCheckbox);
    expect(hddCheckbox.checked).toBe(true);

    expect(ssdCheckbox.checked).toBe(false);
    fireEvent.click(ssdCheckbox);
    expect(ssdCheckbox.checked).toBe(true);
    fireEvent.click(ssdCheckbox);
    expect(ssdCheckbox.checked).toBe(true);
    expect(hddCheckbox.checked).toBe(false);
  });
});
