import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
export function useData() {
  const { __ } = useLocales();
  return [
    {
      tariff: "Free",
      price: 0,
      desc: __("На пользователя в месяц начиная с 3 польз."),
      current: true,
      dayOffer: false,
      options: [
        {
          img: `${imageSrc}assets/PrivateCabinet/pie-chart-5.svg`,
          text: __("2 000 ГБ места для безопасного хранения файлов"),
        },
        {
          img: `${imageSrc}assets/PrivateCabinet/folder-3.svg`,
          text: __(
            "Простые инструменты для храннения и предоставления доступа и совместной работы"
          ),
        },
      ],
    },
    {
      tariff: "Standart",
      price: 30,
      desc: __("На пользователя в месяц начиная с 3 польз."),
      current: false,
      dayOffer: false,
      options: [
        {
          img: `${imageSrc}assets/PrivateCabinet/pie-chart-5.svg`,
          text: __("2 000 ГБ места для безопасного хранения файлов"),
        },
        {
          img: `${imageSrc}assets/PrivateCabinet/folder-3.svg`,
          text: __(
            "Простые инструменты для храннения и предоставления доступа и совместной работы"
          ),
        },
      ],
    },
    {
      tariff: "Premium",
      price: 50,
      oldPrice: 100,
      desc: __("На пользователя в месяц начиная с 3 польз."),
      current: false,
      dayOffer: true,
      options: [
        {
          img: `${imageSrc}assets/PrivateCabinet/pie-chart-5.svg`,
          text: __("2 000 ГБ места для безопасного хранения файлов"),
        },
        {
          img: `${imageSrc}assets/PrivateCabinet/folder-3.svg`,
          text: __(
            "Простые инструменты для храннения и предоставления доступа и совместной работы"
          ),
        },
      ],
    },
    {
      tariff: "Premium plus",
      price: 120,
      desc: __("На пользователя в месяц начиная с 3 польз."),
      current: false,
      dayOffer: false,
      options: [
        {
          img: `${imageSrc}assets/PrivateCabinet/pie-chart-5.svg`,
          text: __("2 000 ГБ места для безопасного хранения файлов"),
        },
        {
          img: `${imageSrc}assets/PrivateCabinet/folder-3.svg`,
          text: __(
            "Простые инструменты для храннения и предоставления доступа и совместной работы"
          ),
        },
      ],
    },
  ];
}
