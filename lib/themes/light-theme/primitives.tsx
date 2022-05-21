
import colorTokens from "./color-tokens.js";
import { defaultFontTokens } from "../shared/typography.js";
import type { PrimitivesT } from "../types.js";

// We don't use this ourselves. We provide it for backward compatibility.
// People may have used it to create their own custom theme.
const primitives: PrimitivesT = {
  ...colorTokens,
  ...defaultFontTokens,
};

export default primitives;
