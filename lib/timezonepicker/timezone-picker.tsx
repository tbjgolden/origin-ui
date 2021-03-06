import React from "react";
import { format, getTimezoneOffset } from "date-fns-tz";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import { LocaleContext } from "../locale";
import { Select } from "../select";
import { zones } from "./tzdata";
class TimezonePicker extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { timezones: [], value: null };
    this.buildTimezones = (compareDate) => {
      const timezones = [];
      for (const zoneName of zones) {
        try {
          const offset = getTimezoneOffset(zoneName, compareDate) / 36e5;
          const offsetFormatted = `${offset >= 0 ? "+" : "-"}${Math.abs(offset)}`;
          let label = `(GMT${offsetFormatted}) ${zoneName.replace(/_/g, " ")}`;
          if (this.props.includeAbbreviations) {
            const abbreviation = format(compareDate, "zzz", { timeZone: zoneName });
            if (abbreviation) {
              label += ` - ${abbreviation}`;
            }
          }
          const offsetMinutes = offset * 60;
          timezones.push({
            id: zoneName,
            label,
            offset: offsetMinutes === 0 ? 0 : offsetMinutes * -1,
          });
        } catch {
          console.error(`failed to format zone name ${zoneName}`);
        }
      }
      return timezones.sort((a, b) => {
        const offsetDelta = b.offset - a.offset;
        if (offsetDelta !== 0) return offsetDelta;
        if (typeof a.label === "string" && typeof b.label === "string") {
          if (a.label < b.label) return -1;
          if (a.label > b.label) return 1;
        }
        return 0;
      });
    };
  }
  componentDidMount() {
    const timezones = this.buildTimezones(this.props.date || new Date());
    if (__BROWSER__) {
      if (!this.props.value) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.setState({ timezones, value: tz });
        const option = timezones.find((o) => {
          return o.id === tz;
        });
        option && this.props.onChange && this.props.onChange(option);
      } else {
        this.setState({ timezones });
      }
    } else {
      this.setState({ timezones });
    }
  }
  componentDidUpdate(prevProps) {
    const prevTime = prevProps.date ? prevProps.date.getTime() : 0;
    const nextTime = this.props.date ? this.props.date.getTime() : 0;
    if (prevTime !== nextTime) {
      const timezones = this.buildTimezones(this.props.date || new Date());
      this.setState({ timezones });
      const option = timezones.find((o) => {
        return o.id === this.state.value;
      });
      option && this.props.onChange && this.props.onChange(option);
    }
  }
  render() {
    const { overrides = {} } = this.props;
    const [OverriddenSelect, selectProps] = getOverrides(overrides.Select, Select);
    selectProps.overrides = mergeOverrides(
      {
        Dropdown: { style: { maxHeight: "360px" } },
      },
      selectProps.overrides
    );
    let options = this.state.timezones;
    if (this.props.mapLabels) {
      options = options.map((option) => {
        option.label = this.props.mapLabels(option);
        return option;
      });
    }
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <OverriddenSelect
              aria-label={locale.datepicker.timezonePickerAriaLabel}
              options={options}
              clearable={false}
              disabled={this.props.disabled}
              error={this.props.error}
              positive={this.props.positive}
              size={this.props.size}
              onChange={(params) => {
                if (params.type === "clear") {
                  this.setState({ value: "" });
                  this.props.onChange && this.props.onChange(null);
                } else {
                  this.setState({ value: params.option.id });
                  this.props.onChange && this.props.onChange(params.option);
                }
              }}
              value={
                this.props.value || this.state.value
                  ? [{ id: this.props.value || this.state.value }]
                  : null
              }
              {...selectProps}
            />
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
export default TimezonePicker;
