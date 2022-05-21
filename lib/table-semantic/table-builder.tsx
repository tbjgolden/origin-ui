import * as React from "react";
import {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledTableLoadingMessage,
  StyledTableEmptyMessage,
  StyledSortIconContainer,
} from "./styled-components";
import { getOverrides } from "../helpers/overrides";
import Blank from "../icon/blank";
import ChevronDown from "../icon/chevron-down";
import ChevronUp from "../icon/chevron-up";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
export default class TableBuilder extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocusVisible: false,
    };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
  }
  render() {
    const {
      overrides = {},
      children,
      data,
      divider,
      horizontalScrollWidth,
      sortColumn,
      sortOrder = "ASC",
      onSort,
      isLoading,
      loadingMessage,
      emptyMessage,
      size,
      ...rest
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Table, tableProps] = getOverrides(overrides.Table, StyledTable);
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
    const [TableHeadCellSortable, tableHeadCellSortableProps] = getOverrides(
      overrides.TableHeadCellSortable,
      StyledTableHeadCellSortable
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
    const [SortIconContainer, sortIconContainerProps] = getOverrides(
      overrides.SortIconContainer,
      StyledSortIconContainer
    );
    const [SortAscIcon, sortAscIconProps] = getOverrides(
      overrides.SortAscIcon,
      ChevronUp
    );
    const [SortDescIcon, sortDescIconProps] = getOverrides(
      overrides.SortDescIcon,
      ChevronDown
    );
    const [SortNoneIcon, sortNoneIconProps] = getOverrides(overrides.SortNoneIcon, Blank);
    const columns = React.Children.toArray(children)
      .filter(Boolean)
      .map((child) => {
        return child.props;
      });
    function renderHeader(col, colIndex, isFocusVisible2) {
      const colOverrides = col.overrides || {};
      if (!col.sortable) {
        const [ColTableHeadCell, colTableHeadCellProps] = getOverrides(
          colOverrides.TableHeadCell,
          TableHeadCell
        );
        return (
          <ColTableHeadCell
            key={colIndex}
            $col={col}
            $colIndex={colIndex}
            $divider={divider}
            $isNumeric={col.numeric}
            $size={size}
            {...tableHeadCellProps}
            {...colTableHeadCellProps}
          >
            {col.header}
          </ColTableHeadCell>
        );
      }
      const [ColTableHeadCellSortable, colTableHeadCellSortableProps] = getOverrides(
        colOverrides.TableHeadCellSortable,
        TableHeadCellSortable
      );
      let sortIcon = null;
      let sortLabel = "not sorted";
      switch (col.id === sortColumn && sortOrder) {
        case "ASC":
          sortIcon = (
            <SortAscIcon
              size="16px"
              aria-hidden={true}
              role="presentation"
              {...sortAscIconProps}
            />
          );
          sortLabel = "ascending sorting";
          break;
        case "DESC":
          sortIcon = (
            <SortDescIcon
              size="16px"
              aria-hidden={true}
              role="presentation"
              {...sortDescIconProps}
            />
          );
          sortLabel = "descending sorting";
          break;
        default:
          sortIcon = (
            <SortNoneIcon
              size="16px"
              aria-hidden={true}
              role="presentation"
              {...sortNoneIconProps}
            />
          );
          break;
      }
      return (
        <ColTableHeadCellSortable
          key={colIndex}
          $col={col}
          $colIndex={colIndex}
          $divider={divider}
          $isNumeric={col.numeric}
          role="button"
          tabIndex="0"
          aria-label={`${col.tableHeadAriaLabel || col.header}, ${sortLabel}`}
          $isFocusVisible={isFocusVisible2}
          onClick={() => {
            return onSort && onSort(col.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSort && onSort(col.id);
            }
          }}
          {...tableHeadCellSortableProps}
          {...colTableHeadCellSortableProps}
        >
          {col.header}
          <SortIconContainer {...sortIconContainerProps}>{sortIcon}</SortIconContainer>
        </ColTableHeadCellSortable>
      );
    }
    function renderCell(col, colIndex, row, rowIndex, lastRowindex) {
      const colOverrides = col.overrides || {};
      const [ColTableBodyCell, colTableBodyCellProps] = getOverrides(
        colOverrides.TableBodyCell,
        TableBodyCell
      );
      return (
        <ColTableBodyCell
          key={colIndex}
          $col={col}
          $colIndex={colIndex}
          $divider={divider}
          $row={row}
          $rowIndex={rowIndex}
          $isNumeric={col.numeric}
          $isLastRow={rowIndex === lastRowindex}
          $isSortable={col.sortable}
          $size={size}
          {...tableBodyCellProps}
          {...colTableBodyCellProps}
        >
          {col.children(row, rowIndex)}
        </ColTableBodyCell>
      );
    }
    const isEmpty = !isLoading && data.length === 0;
    const isRendered = !isLoading && !isEmpty;
    return (
      <Root
        data-baseweb="table-builder-semantic"
        $divider={divider}
        {...rootProps}
        {...rest}
      >
        <Table
          $width={horizontalScrollWidth}
          {...tableProps}
          onBlur={forkBlur(tableProps, this.handleBlur)}
          onFocus={forkFocus(tableProps, this.handleFocus)}
        >
          <TableHead {...tableHeadProps}>
            <TableHeadRow {...tableHeadRowProps}>
              {columns.map((col, colIndex) => {
                return renderHeader(col, colIndex, this.state.isFocusVisible);
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
                      return renderCell(col, colIndex, row, rowIndex, data.length - 1);
                    })}
                  </TableBodyRow>
                );
              })}
          </TableBody>
        </Table>
      </Root>
    );
  }
}
TableBuilder.defaultProps = {
  data: [],
  loadingMessage: "Loading...",
};
