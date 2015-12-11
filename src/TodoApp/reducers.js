import {combineReducers} from 'redux';
import {VisibilityFilters, ADD_TODO, SET_VISIBILITY_FILTER, COMPLETE_TODO} from './actions';
const {SHOW_ALL} = VisibilityFilters;

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];

        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];

        default:
            return state;
    }
}

export const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;