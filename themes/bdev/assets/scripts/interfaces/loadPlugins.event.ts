import i18next from "i18next";
import feather from 'feather-icons';
import ResponsiveHelpers from "../helpers/responsive.helpers";

export default interface LoadPluginsPayload {
  translation: typeof i18next,
  responsive: ResponsiveHelpers
  icons: typeof feather
}

