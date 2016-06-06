import React, {Component} from 'react';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});

export default class App extends Component {
  propsType() {

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <h1>TEST!!!</h1>
      </MuiThemeProvider>
    );
  }
}
