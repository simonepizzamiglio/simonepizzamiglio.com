export function getYOE(startYear: number, startMonth: number) {
  const currentDate = new Date();
  const years = currentDate.getFullYear() - startYear;
  const months = currentDate.getMonth() - startMonth;

  const totalYears = years + months / 12;
  return totalYears > 0 ? Math.floor(totalYears) : 0;
}

export function getYearsAndMonths(startDate: string, endDate: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  let totalMonths = years * 12 + months;

  // Add 1 month to account for partial months
  if (end.getDate() >= start.getDate() || end.getDate() === start.getDate()) {
    totalMonths += 1;
  }

  const yearsText = Math.floor(totalMonths / 12);
  const monthsText = totalMonths % 12;

  let result = '';
  if (yearsText > 0) {
    result += `${yearsText} ${yearsText === 1 ? 'yr' : 'yrs'}`;
    if (monthsText > 0) {
      result += ' ';
      result += `${monthsText} ${monthsText === 1 ? 'mo' : 'mos'}`;
    }
  } else {
    result = `${monthsText} ${monthsText === 1 ? 'mo' : 'mos'}`;
  }

  return result;
}
