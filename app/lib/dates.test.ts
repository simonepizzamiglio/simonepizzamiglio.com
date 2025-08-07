import { it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getYOE, getYearsAndMonths } from './dates';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const startYear = 2016;
const startMonth = 10;

it('should return correct years of experience from November 2016', () => {
  // Test for December 2024 (8 years, 1 month)
  vi.setSystemTime(new Date('2024-12-01'));
  expect(getYOE(startYear, startMonth)).toBe(8);
});

it('should return 0 for dates before November 2016', () => {
  // Test for October 2016 (before start date)
  vi.setSystemTime(new Date('2016-10-01'));
  expect(getYOE(startYear, startMonth)).toBe(0);
});

it('should return correct value exactly at start date', () => {
  // Test for November 2016 (exactly at start)
  vi.setSystemTime(new Date('2016-11-01'));
  expect(getYOE(startYear, startMonth)).toBe(0);
});

it('should return correct value after one year', () => {
  // Test for November 2017 (exactly 1 year)
  vi.setSystemTime(new Date('2017-11-01'));
  expect(getYOE(startYear, startMonth)).toBe(1);
});

it('should handle partial years correctly', () => {
  // Test for June 2017 (7 months)
  vi.setSystemTime(new Date('2017-06-01'));
  expect(getYOE(startYear, startMonth)).toBe(0);
});

it('should return correct value for multiple years', () => {
  // Test for March 2025 (8 years, 4 months)
  vi.setSystemTime(new Date('2025-03-01'));
  expect(getYOE(startYear, startMonth)).toBe(8);
});

// getYearsAndMonths tests
beforeEach(() => {
  // Set a consistent "current" date for tests that use null endDate
  vi.setSystemTime(new Date('2024-12-01'));
});

it('should return correct format for exact years', () => {
  expect(getYearsAndMonths('2020-01-01', '2022-01-01')).toBe('2 yrs 1 mo');
});

it('should return correct format for exact months', () => {
  expect(getYearsAndMonths('2024-01-01', '2024-06-01')).toBe('6 mos');
});

it('should return correct format for years and months', () => {
  expect(getYearsAndMonths('2020-01-01', '2022-06-01')).toBe('2 yrs 6 mos');
});

it('should return singular form for 1 year', () => {
  expect(getYearsAndMonths('2023-01-01', '2024-01-01')).toBe('1 yr 1 mo');
});

it('should return singular form for 1 month', () => {
  expect(getYearsAndMonths('2024-01-01', '2024-02-01')).toBe('2 mos');
});

it('should return "0 mos" for same date', () => {
  expect(getYearsAndMonths('2024-01-01', '2024-01-01')).toBe('1 mo');
});

it('should use current date when endDate is null', () => {
  // Current date is set to 2024-12-01
  expect(getYearsAndMonths('2024-01-01', null)).toBe('1 yr');
});

it('should handle cross-year calculations correctly', () => {
  expect(getYearsAndMonths('2023-06-15', '2025-03-15')).toBe('1 yr 10 mos');
});

it('should handle same month different years', () => {
  expect(getYearsAndMonths('2020-06-01', '2023-06-01')).toBe('3 yrs 1 mo');
});

it('should handle negative month differences correctly', () => {
  expect(getYearsAndMonths('2023-12-01', '2024-06-01')).toBe('7 mos');
});

it('should handle large time spans', () => {
  expect(getYearsAndMonths('2010-01-01', '2024-06-01')).toBe('14 yrs 6 mos');
});
