import en from "./en";
import uk from "./uk";

const Locales = {
  en,
  uk,
  ru: () => import("./ru").then((data) => data.default)
};

export default Locales;
