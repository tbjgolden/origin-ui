import sharedBorders from "../shared/borders";
import deepMerge from "../../utils/deep-merge";
const borders = deepMerge({}, sharedBorders, {
  border100: {
    borderColor: "hsla(0, 0%, 100%, 0.04)"
  },
  border200: {
    borderColor: "hsla(0, 0%, 100%, 0.08)"
  },
  border300: {
    borderColor: "hsla(0, 0%, 100%, 0.12)"
  },
  border400: {
    borderColor: "hsla(0, 0%, 100%, 0.16)"
  },
  border500: {
    borderColor: "hsla(0, 0%, 100%, 0.2)"
  },
  border600: {
    borderColor: "hsla(0, 0%, 100%, 0.24)"
  }
});
export default borders;
