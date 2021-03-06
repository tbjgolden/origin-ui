import React from "react";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from "./styled-components";
import { ProgressBar } from "../progress-bar";
export default class Table extends React.Component {
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
          {this.props.columns.map((column, index) => {
            return <StyledHeadCell key={index}>{column}</StyledHeadCell>;
          })}
        </StyledHead>
        <StyledBody $width={this.props.horizontalScrollWidth}>
          {this.props.data.map((row, index) => {
            return (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => {
                  return <StyledCell key={cellIndex}>{cell}</StyledCell>;
                })}
              </StyledRow>
            );
          })}
        </StyledBody>
      </StyledTable>
    );
  }
}
Table.defaultProps = {
  columns: [],
  data: [[]],
  isLoading: false,
};
