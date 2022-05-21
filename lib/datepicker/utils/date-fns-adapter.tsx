import DateFnsUtils from "@date-io/date-fns";
import type { DateIOAdapter } from "./types.js";

const adapter: DateIOAdapter<Date> = new DateFnsUtils({});

export default adapter;
