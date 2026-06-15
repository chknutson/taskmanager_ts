export function getTodayRange() {
    const now = new Date();
  
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
  
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
  
    return { start, end };
}
  
export function endOfDaysFromToday(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(23, 59, 59, 999)
  return d
}