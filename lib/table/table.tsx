import * as React from "react";

import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from "./styled-components.js";

import { ProgressBar } from "../progress-bar/index.js";

import type { TablePropsT } from "./types.js";

export default class Table extends React.Component<TablePropsT> {
  static defaultProps = {
    columns: [],
    data: [[]],
    isLoading: false,
  };

  render() {
    return (
      <StyledTable
        data-baseweb="table"
        aria-colcount={this.props.columns.length}
        aria-rowcount={this.props.data.length}
      >
        {this.props.isLoading && (
          <ProgressBar
            infinite
            overrides={{
              Bar: {
                style: {
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                },
              },
            }}
          />
        )}
        <StyledHead $width={this.props.horizontalScrollWidth}>
          {this.props.columns.map((column, index) => (
            <StyledHeadCell key={index}>{column}</StyledHeadCell>
          ))}
        </StyledHead>
        <StyledBody $width={this.props.horizontalScrollWidth}>
          {this.props.data.map((row, index) => (
            <StyledRow key={index}>
              {row.map((cell, cellIndex) => (
                <StyledCell key={cellIndex}>{cell}</StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    );
  }
}
