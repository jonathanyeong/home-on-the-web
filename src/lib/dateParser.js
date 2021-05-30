export const readableDate = (date) => {
  const dateObj = new Date(date)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);

  return `${da} ${mo}, ${ye}`;
}

export const htmlDate = (date) => {
  const dateObj = new Date(date)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateObj);
  let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);

  return `${ye}-${mo}-${da}`;
}
