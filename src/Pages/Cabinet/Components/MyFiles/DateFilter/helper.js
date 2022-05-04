import { useLocales } from "react-localized";

export function useGetYears() {
  const { __ } = useLocales();
  return () => {
    const years = [];
    for (let i = new Date().getFullYear(); i >= 1920; i--) {
      years.push({ id: i, text: __(`${i} год`) });
    }
    return years;
  };
}

export function useGetDays() {
  const { __ } = useLocales();
  return () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ id: i, text: __(`${i} день`) });
    }
    return days;
  };
}

export function useMonths() {
  const { __ } = useLocales();
  return [
    { id: 1, text: __("Январь") },
    { id: 2, text: __("Февраль") },
    { id: 3, text: __("Март") },
    { id: 4, text: __("Апрель") },
    { id: 5, text: __("Май") },
    { id: 6, text: __("Июнь") },
    { id: 7, text: __("Июль") },
    { id: 8, text: __("Август") },
    { id: 9, text: __("Сентябрь") },
    { id: 10, text: __("Октябрь") },
    { id: 11, text: __("Ноябрь") },
    { id: 12, text: __("Декабрь") },
  ];
}
