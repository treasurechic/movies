import './App.scss';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Homepage from './Homepage';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <>
      <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
