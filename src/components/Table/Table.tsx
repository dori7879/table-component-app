import React, { useEffect, FC, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Checkbox,
  IconButton,
  TablePagination,
  TableFooter,
  Button,
  TableCell,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { usersAPI } from "../../api/data";
import { IUser } from "./interface";

const TableComponent: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const getUserList = async () => {
      setLoading(true);
      const res = await usersAPI.getUsers();
      if (res?.status === 200) {
        if (res?.data.length > 0) {
          res.data[0].checked = true;
        }
        setUsers(() => res?.data);
      }

      setLoading(false);
    };
    getUserList();
  }, []);

  const handleDelete = (id: number) => {
    let result: Array<IUser> = users.filter((el) => el.id !== id);
    setUsers(result);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const setUserChecked = (value: boolean, id: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            checked: value,
          };
        }

        return user;
      })
    );
  };

  const handleRowClick = (id: number) => {
    history.push(`/user/${id}`);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" mb={2} flexDirection="row" mt={2} ml={5}>
        <Box width="35%" mr={1}>
          <TextField
            fullWidth
            color="secondary"
            id="outlined-basic"
            label="Введите Username"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchVal(event.target.value);
            }}
          />
        </Box>
      </Box>
      <Box display="flex" width="60%" ml={5}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">id</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">username</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">website</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow key={1}>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Идет Загрузка...</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((user) => {
                    if (searchVal) {
                      return user.username
                        .toLowerCase()
                        .includes(searchVal.toLocaleLowerCase());
                    }
                    return users;
                  })
                  .map((user, i, filteredUsers) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">
                        <Checkbox
                          color="secondary"
                          checked={user.checked != null && user.checked}
                          onChange={(event) => {
                            if (event.target.checked === true) {
                              setUserChecked(true, user.id);
                            } else {
                              const checkCount = filteredUsers.reduce(
                                (prev, curr) =>
                                  curr.checked != null && curr.checked
                                    ? prev + 1
                                    : prev,
                                0
                              );
                              if (checkCount > 1) {
                                setUserChecked(false, user.id);
                              }
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          onClick={() => handleRowClick(user.id)}
                        >
                          Подробнее
                        </Button>
                      </TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.website}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={users.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TableComponent;
