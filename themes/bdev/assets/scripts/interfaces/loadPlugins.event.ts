import i18next from "i18next";
import ResponsiveHelpers from "../helpers/responsive.helpers";

export default interface LoadPluginsPayload {
  translation: typeof i18next,
  responsive: ResponsiveHelpers
}

