import {combineReducers,applyMiddleware,createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginReducer as loginData } from '../reducers/reducer'
import { rootSaga } from '../saga/root'



const appData = combineReducers({
    loginData
})

const sagaMiddleware=createSagaMiddleware()
export const store=createStore(appData,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

