import React from "react";
import {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledTableLoadingMessage,
  StyledTableEmptyMessage,
} from "./styled-components";
import { getOverrides } from "../helpers/overrides";
export default class Table extends React.Component {
  render() {
    const {
      overrides = {},
      columns,
      data,
      divider,
      horizontalScrollWidth,
      isLoading,
      loadingMessage,
      emptyMessage,
      size,
      ...rest
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Table2, tableProps] = getOverrides(overrides.Table, StyledTable);
    const [TableHead, tableHeadProps] = getOverrides(
      overrides.TableHead,
      StyledTableHead
    );
    const [TableHeadRow, tableHeadRowProps] = getOverrides(
      overrides.TableHeadRow,
      StyledTableHeadRow
    );
    const [TableHeadCell, tableHeadCellProps] = getOverrides(
      overrides.TableHeadCell,
      StyledTableHeadCell
    );
    const [TableBody, tableBodyProps] = getOverrides(
      overrides.TableBody,
      StyledTableBody
    );
    const [TableBodyRow, tableBodyRowProps] = getOverrides(
      overrides.TableBodyRow,
      StyledTableBodyRow
    );
    const [TableBodyCell, tableBodyCellProps] = getOverrides(
      overrides.TableBodyCell,
      StyledTableBodyCell
    );
    const [TableLoadingMessage, tableLoadingMessageProps] = getOverrides(
      overrides.TableLoadingMessage,
      StyledTableLoadingMessage
    );
    const [TableEmptyMessage, tableEmptyMessageProps] = getOverrides(
      overrides.TableEmptyMessage,
      StyledTableEmptyMessage
    );
    const isEmpty = !isLoading && data.length === 0;
    const isRendered = !isLoading && !isEmpty;
    return (
      <Root data-baseweb="table-semantic" $divider={divider} {...rootProps} {...rest}>
        <Table2 $width={horizontalScrollWidth} {...tableProps}>
          <TableHead {...tableHeadProps}>
            <TableHeadRow {...tableHeadRowProps}>
              {columns.map((col, colIndex) => {
                return (
                  <TableHeadCell
                    key={colIndex}
                    $col={col}
                    $colIndex={colIndex}
                    $divider={divider}
                    $size={size}
                    {...tableHeadCellProps}
                  >
                    {col}
                  </TableHeadCell>
                );
              })}
            </TableHeadRow>
          </TableHead>
          <TableBody {...tableBodyProps}>
            {isLoading && (
              <tr>
                <td colSpan={columns.length}>
                  <TableLoadingMessage {...tableLoadingMessageProps}>
                    {typeof loadingMessage === "function"
                      ? loadingMessage()
                      : loadingMessage}
                  </TableLoadingMessage>
                </td>
              </tr>
            )}
            {isEmpty && emptyMessage && (
              <tr>
                <td colSpan={columns.length}>
                  <TableEmptyMessage {...tableEmptyMessageProps}>
                    {typeof emptyMessage === "function" ? emptyMessage() : emptyMessage}
                  </TableEmptyMessage>
                </td>
              </tr>
            )}
            {isRendered &&
              data.map((row, rowIndex) => {
                return (
                  <TableBodyRow
                    key={rowIndex}
                    $divider={divider}
                    $row={row}
                    $rowIndex={rowIndex}
                    {...tableBodyRowProps}
                  >
                    {columns.map((col, colIndex) => {
                      return (
                        <TableBodyCell
                          key={colIndex}
                          $col={col}
                          $colIndex={colIndex}
                          $divider={divider}
                          $row={row}
                          $rowIndex={rowIndex}
                          $isLastRow={rowIndex === data.length - 1}
                          $size={size}
                          {...tableBodyCellProps}
                        >
                          {row[colIndex]}
                        </TableBodyCell>
                      );
                    })}
                  </TableBodyRow>
                );
              })}
          </TableBody>
        </Table2>
      </Root>
    );
  }
}
Table.defaultProps = {
  columns: [],
  data: [[]],
  loadingMessage: "Loading...",
};
