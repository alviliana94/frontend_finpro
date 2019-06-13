import React from 'react'
import ReactDOM from 'react-dom' 
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import App from './components/App.js'
import reducers from './reducers'

const store = createStore(reducers,applyMiddleware(logger,thunk))


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.querySelector('#root'))