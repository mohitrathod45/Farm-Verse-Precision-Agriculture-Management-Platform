/**
 * Utility function to format date strings (YYYY-MM-DD or ISO strings) into "DD MMM YYYY" format.
 * Example: "2026-07-29" -> "29 Jul 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (err) {
    return dateString;
  }
};
