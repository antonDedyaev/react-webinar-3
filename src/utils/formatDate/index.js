/**
 * Преобразование даты в правильный формат
 * @param dateStr {String}
 * @param locale {String}
 * @returns {String}
 */

export default function formatDate(dateStr, locale = "ru-RU") {
  const dateObj = new Date(dateStr);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return dateObj.toLocaleString(locale, options);
}
