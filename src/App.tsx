import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TableComponent } from "./components/Table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Тестовое задание
            </Typography>
            <Typography color="inherit">Выполнила: Шакенова Дария</Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={TableComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
