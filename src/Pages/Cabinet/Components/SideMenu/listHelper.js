import { imageSrc } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";

export function useMenu() {
  const { __ } = useLocales();
  return [
    {
      name: __("Мои папки"),
      path: "/folders",
      src: `${imageSrc}assets/PrivateCabinet/folder.svg`
    },
    {
      name: __("Мои файлы"),
      path: "/files",
      src: `${imageSrc}assets/PrivateCabinet/file.svg`
    },
    {
      name: __("Чат"),
      path: "/chat-page",
      src: `${imageSrc}assets/PrivateCabinet/sms.svg`
    },
    {
      name: __("Календарь"),
      path: "/calendar",
      src: `${imageSrc}assets/PrivateCabinet/calendar-5.svg`
    },
    {
      name: __("Мои задачи"),
      path: "/tasks",
      src: `${imageSrc}assets/PrivateCabinet/calendar-4.svg`
    },
    {
      name: __("Программы"),
      path: "/programs",
      src: `${imageSrc}assets/PrivateCabinet/programs.svg`
    },
    {
      name: __("Сейф"),
      path: "/safe",
      src: `${imageSrc}assets/PrivateCabinet/safe.svg`
    },
    {
      name: __("Подключенные устройства"),
      path: "/devices",
      src: `${imageSrc}assets/PrivateCabinet/devices.svg`
    },
    {
      name: __("Совместный проект"),
      path: "/project",
      src: `${imageSrc}assets/PrivateCabinet/men.svg`
    },
    {
      name: "Расшаренные файлы",
      path: "/shared-files",
      src: `${imageSrc}assets/PrivateCabinet/sharedFiles.svg`
    },
    {
      name: __("Загруженные файлы"),
      path: "/downloaded-files",
      src: `${imageSrc}assets/PrivateCabinet/loadedFiles.svg`
    },
    {
      name: __("Архив"),
      path: "/archive",
      src: `${imageSrc}assets/PrivateCabinet/archive.svg`
    },
    {
      name: __("Библиотека"),
      path: "/library",
      src: `${imageSrc}assets/PrivateCabinet/book-1.svg`
    },
    {
      name: __("Журнал"),
      path: "/journal",
      src: `${imageSrc}assets/PrivateCabinet/clock.svg`
    },
    {
      name: __("Корзина"),
      path: "/cart",
      src: `${imageSrc}assets/PrivateCabinet/trash.svg`
    }
  ];
}

export function useBusinessMenu() {
  const { __ } = useLocales();
  return [
    {
      name: __("Компания"),
      path: "/company",
      src: `${imageSrc}assets/BusinessCabinet/menu-icons/company.svg`
    },
    {
      name: __("Мой отдел"),
      path: "/department",
      src: `${imageSrc}assets/BusinessCabinet/menu-icons/my-department.svg`
    },
    {
      name: __("Совместный проект"),
      path: "/project",
      src: `${imageSrc}assets/BusinessCabinet/menu-icons/joined-project.svg`
    },
    {
      name: __("Мои папки"),
      path: "/folders",
      src: `${imageSrc}assets/PrivateCabinet/folder.svg`
    },
    {
      name: __("Мои файлы"),
      path: "/files",
      src: `${imageSrc}assets/PrivateCabinet/file.svg`
    },
    {
      name: __("Мои задачи"),
      path: "/devices",
      src: `${imageSrc}assets/BusinessCabinet/menu-icons/tasks.svg`
    },
    {
      name: __("Календарь"),
      path: "/calendar",
      src: `${imageSrc}assets/BusinessCabinet/menu-icons/calendar.svg`
    },
    {
      name: __("Чат"),
      path: "/chat-page",
      src: `${imageSrc}assets/PrivateCabinet/sms.svg`
    },
    {
      name: __("Программы"),
      path: "/programs",
      src: `${imageSrc}assets/PrivateCabinet/programs.svg`
    },
    {
      name: __("Сейф"),
      path: "/safe",
      src: `${imageSrc}assets/PrivateCabinet/safe.svg`
    },
    {
      name: __("Расшаренные файлы"),
      path: "/shared-files",
      src: `${imageSrc}assets/PrivateCabinet/sharedFiles.svg`
    },
    {
      name: __("Загруженные файлы"),
      path: "/downloaded-files",
      src: `${imageSrc}assets/PrivateCabinet/loadedFiles.svg`
    },
    {
      name: __("Архив"),
      path: "/archive",
      src: `${imageSrc}assets/PrivateCabinet/archive.svg`
    },
    {
      name: __("Библиотека"),
      path: "/library",
      src: `${imageSrc}assets/PrivateCabinet/book-1.svg`
    },
    {
      name: __("Журнал"),
      path: "/journal",
      src: `${imageSrc}assets/PrivateCabinet/clock.svg`
    },
    {
      name: __("Корзина"),
      path: "/cart",
      src: `${imageSrc}assets/PrivateCabinet/trash.svg`
    }
  ];
}
