import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import { notice } from "../lib/models/notice";
import Grid from "@material-ui/core/Grid";

const Sheet = styled(Paper)`
  width: 90%;
  max-width:1200px;
  .filter-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 3vh;
    margin-bottom: 3vh;
    div {
      display: flex;
      align-items: end;
    }
  }
  .sheet-container {
    max-width: 100%;
    overflow-x: scroll;
  }
  #table-head {
    font-weight: bold;
    font-size: 1rem;
  }
  #table-detail {
    font-size: 1rem;
  }
`;

export default function Tablepage(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const detail = JSON.parse(props.data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Sheet>
      
      <div className="filter-row">
        <div>
          <SearchIcon />
          <TextField
            id="name-search"
            label="Search by name"
            value={name}
            onChange={handleNameChange}
            type="search"
          />
        </div>
        <div>
          <FilterListIcon />
          <TextField
            id="category-filter"
            label="Filter by category"
            value={category}
            onChange={handleCategoryChange}
            type="search"
          />
        </div>
      </div>
      <TableContainer className="sheet-container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.notice.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  id="table-head"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {detail
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {props.notice.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          id="table-detail"
                        >
                          {typeof value == "number" &&
                          value.toString().length === 13
                            ? Date(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={detail.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Sheet>
  );
}
