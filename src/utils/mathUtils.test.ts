import { angleOfLineBetweenPoints } from './mathUtils';

const radToDegreeTwoDigits = (rad: number) => {
  return ((rad * 180) / Math.PI).toFixed(2);
};

describe('angleOfLineBetweenPoints => ', () => {
  test('should be 0 degrees', () => {
    expect(angleOfLineBetweenPoints(0, 0, 1, 0)).toBe(0);
  });
  test('should be 90 degrees', () => {
    let angle = radToDegreeTwoDigits(angleOfLineBetweenPoints(0, 0, 0, 2));
    expect(angle).toBe('90.00');
  });
  test('should be -90 degrees', () => {
    let angle = radToDegreeTwoDigits(angleOfLineBetweenPoints(0, 2, 0, 0));
    expect(angle).toBe('-90.00');
  });
  test('should be 180 degrees', () => {
    let angle = radToDegreeTwoDigits(angleOfLineBetweenPoints(1, 4, 1, 2));
    expect(angle).toBe('-90.00');
  });
  test('same point should be 0', () => {
    let angle = radToDegreeTwoDigits(angleOfLineBetweenPoints(1, 1, 1, 1));
    expect(angle).toBe('0.00');
  });
});
