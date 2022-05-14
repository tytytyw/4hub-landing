import en from "./en";
import uk from "./uk";
import pl from "./pl";
import de from "./de";

const Locales = {
  en,
  uk,
  pl,
  de,
  ru: () => import("./ru").then((data) => data.default)
};

export default Locales;
