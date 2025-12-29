import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isBefore,
  isAfter,
  isSameDay,
  isToday,
  isTomorrow,
  isThisWeek,
  parseISO,
} from "date-fns";

/**
 * Date Helper Utilities
 * Common date operations used throughout the application
 */

export const dateHelpers = {
  /**
   * Format date to display string
   */
  formatDate(date, formatStr = "yyyy-MM-dd") {
    if (!date) return "";
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr);
  },

  /**
   * Format date to readable string (e.g., "Monday, Jan 15")
   */
  formatReadable(date) {
    return this.formatDate(date, "EEEE, MMM d");
  },

  /**
   * Format date with year (e.g., "Jan 15, 2025")
   */
  formatWithYear(date) {
    return this.formatDate(date, "MMM d, yyyy");
  },

  /**
   * Get week start (Monday)
   */
  getWeekStart(date = new Date()) {
    return startOfWeek(date, { weekStartsOn: 1 });
  },

  /**
   * Get week end (Sunday)
   */
  getWeekEnd(date = new Date()) {
    return endOfWeek(date, { weekStartsOn: 1 });
  },

  /**
   * Get array of dates for current week
   */
  getWeekDates(startDate = new Date()) {
    const start = this.getWeekStart(startDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  },

  /**
   * Get today's date at start of day
   */
  getToday() {
    return startOfDay(new Date());
  },

  /**
   * Get tomorrow's date
   */
  getTomorrow() {
    return addDays(this.getToday(), 1);
  },

  /**
   * Get date N days from now
   */
  getDaysFromNow(days) {
    return addDays(this.getToday(), days);
  },

  /**
   * Get date N days ago
   */
  getDaysAgo(days) {
    return subDays(this.getToday(), days);
  },

  /**
   * Calculate days until a date
   */
  daysUntil(targetDate) {
    const target =
      typeof targetDate === "string" ? parseISO(targetDate) : targetDate;
    return differenceInDays(target, this.getToday());
  },

  /**
   * Calculate days between two dates
   */
  daysBetween(startDate, endDate) {
    const start =
      typeof startDate === "string" ? parseISO(startDate) : startDate;
    const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
    return differenceInDays(end, start);
  },

  /**
   * Check if date is in the past
   */
  isPast(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return isBefore(dateObj, this.getToday());
  },

  /**
   * Check if date is in the future
   */
  isFuture(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return isAfter(dateObj, this.getToday());
  },

  /**
   * Check if date is today
   */
  isToday(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return isToday(dateObj);
  },

  /**
   * Check if date is tomorrow
   */
  isTomorrow(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return isTomorrow(dateObj);
  },

  /**
   * Check if date is this week
   */
  isThisWeek(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return isThisWeek(dateObj, { weekStartsOn: 1 });
  },

  /**
   * Check if two dates are the same day
   */
  isSameDay(date1, date2) {
    const d1 = typeof date1 === "string" ? parseISO(date1) : date1;
    const d2 = typeof date2 === "string" ? parseISO(date2) : date2;
    return isSameDay(d1, d2);
  },

  /**
   * Get relative time description (e.g., "in 3 days", "tomorrow")
   */
  getRelativeTime(date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    const days = this.daysUntil(dateObj);

    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days === -1) return "Yesterday";
    if (days > 1 && days <= 7) return `in ${days} days`;
    if (days > 7 && days <= 14) return `in ${Math.floor(days / 7)} week`;
    if (days > 14) return `in ${Math.floor(days / 7)} weeks`;
    if (days < -1 && days >= -7) return `${Math.abs(days)} days ago`;
    if (days < -7) return `${Math.floor(Math.abs(days) / 7)} weeks ago`;

    return this.formatDate(dateObj, "MMM d");
  },

  /**
   * Convert minutes to hours and minutes string
   */
  minutesToHoursString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  },

  /**
   * Convert minutes to decimal hours
   */
  minutesToHours(minutes) {
    return (minutes / 60).toFixed(1);
  },

  /**
   * Get urgency level based on days until deadline
   */
  getUrgencyLevel(deadline) {
    const days = this.daysUntil(deadline);

    if (days < 0) return { level: "overdue", color: "red", label: "Overdue" };
    if (days === 0)
      return { level: "critical", color: "red", label: "Due today" };
    if (days === 1)
      return { level: "urgent", color: "orange", label: "Due tomorrow" };
    if (days <= 3)
      return { level: "soon", color: "yellow", label: `${days} days left` };
    if (days <= 7)
      return { level: "upcoming", color: "blue", label: "This week" };
    return {
      level: "future",
      color: "gray",
      label: this.formatDate(deadline, "MMM d"),
    };
  },

  /**
   * Get week number of year
   */
  getWeekNumber(date = new Date()) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    const start = new Date(dateObj.getFullYear(), 0, 1);
    const days = Math.floor((dateObj - start) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + start.getDay() + 1) / 7);
  },

  /**
   * Get date range string (e.g., "Jan 15 - Jan 21")
   */
  getDateRangeString(startDate, endDate) {
    return `${this.formatDate(startDate, "MMM d")} - ${this.formatDate(
      endDate,
      "MMM d"
    )}`;
  },

  /**
   * Check if deadline is approaching (within 3 days)
   */
  isDeadlineApproaching(deadline) {
    const days = this.daysUntil(deadline);
    return days >= 0 && days <= 3;
  },

  /**
   * Check if deadline is overdue
   */
  isOverdue(deadline) {
    return this.daysUntil(deadline) < 0;
  },

  /**
   * Parse ISO string to Date object
   */
  parseDate(dateString) {
    if (!dateString) return null;
    return parseISO(dateString);
  },

  /**
   * Get date for form input (yyyy-MM-dd format)
   */
  toInputDate(date = new Date()) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return this.formatDate(dateObj, "yyyy-MM-dd");
  },

  /**
   * Get current timestamp
   */
  now() {
    return new Date();
  },

  /**
   * Get timestamp for start of day
   */
  startOfToday() {
    return startOfDay(new Date());
  },

  /**
   * Get timestamp for end of day
   */
  endOfToday() {
    return endOfDay(new Date());
  },
};

export default dateHelpers;
