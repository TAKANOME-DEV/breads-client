import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import loader from '../loader';
import tags from '../tags';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { ADD_READING, REMOVE_READING, TOGGLE_FAVORITE } from '../actionTypes';
import { FavoriteState, ReadingState, ReadingActionTypes } from "./types";
import { AppDispatch } from '../../app/store';
import { RootState } from '../rootReducer';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AlertActionTypes } from '../alerts/types';

const { addAlert } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;
const { addTag } = tags.actions;

export const toggleFavorite = ({id, user_id}: FavoriteState): ReadingActionTypes => ({
    type: TOGGLE_FAVORITE,
    payload: {
        id,
        user_id
    }
});

export const addReading = (user_id: ReadingState): ReadingActionTypes => ({
    type: ADD_READING,
    payload: {
        user_id
    }
});

export const removeReadings = ({reading_id, user_id}: ReadingState): ReadingActionTypes => ({
    type: REMOVE_READING,
    payload: {
        reading_id,
        user_id
    }
});

export const fetchReadings = (list: any, id?: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any) => {
    if (list === 'global') {
        dispatch(addLoader(list));
        return apiCall('get', '/readings')
            .then(res => {
                dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                dispatch(removeLoader(list));
            })
            .catch(err => {
                dispatch(addAlert({message: err.message, type: 'danger'}));
            });
    } else if (list === 'subscriptions') {
        dispatch(addLoader(list));
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('get', `/readings/${id}/subscriptions`)
            .then(res => {
                dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                dispatch(removeLoader(list));
            })
            .catch(err => {
                dispatch(addAlert({message: err.message, type: 'danger'}));
            });
    } else if (id) {
        dispatch(addLoader(list));
        return apiCall('get', `/readings/${id}`)
            .then(res => {
                dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                dispatch(removeLoader(list));
            })
            .catch(err => {
                dispatch(addAlert({message: err.message, type: 'danger'}));
            });
    }
}


export const postNewReading = (url: any, tags: any): ThunkAction<Promise<void | AlertActionTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any) => {
    dispatch(addLoader('newReading'));
    let { currentUser } = getState();
    const id = currentUser.user.id;
    console.log(tags);
    return apiCall('post', `/users/${id}/readings`, { url, tags })
        .then(() => {
            dispatch(addReading(id));
            dispatch(addTag(id));
            dispatch(removeLoader('newReading'));
            dispatch(addAlert({message: 'Article uploaded', type: 'success'}));
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const removeUserReading = (user_id: any, reading_id: any): ThunkAction<Promise<void | AlertActionTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch) => {
    return apiCall('delete', `/users/${user_id}/readings/${reading_id}`)
        .then(() => {
            dispatch(removeReadings({reading_id, user_id}));
            dispatch(addAlert({message: 'Reading removed', type: 'success'}));
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
};

export const markFavorite = (id: any): ThunkAction<Promise<void | AlertActionTypes | ReadingActionTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('post', `/readings/${id}/favorite/${user_id}`)
        .then(() => dispatch(toggleFavorite({id, user_id})))
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const unfavorite = (id: any): ThunkAction<Promise<void | AlertActionTypes | ReadingActionTypes>, RootState, unknown, Action<string>> => (dispatch: AppDispatch, getState: any) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
        .then(() => dispatch(toggleFavorite({id, user_id}))) // remove favorite from state
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

/**
 * 
 * @todo update prop types once readingsByList state is type checked
 */
const shouldFetchReadings = (state: any, list: any): true | void => {
    const readings = state.readingsByList[list];
    if (!readings) return true;
    
    // only initiates if there's readings
    const upToDate = state.readingsByList[list].upToDate;
    if (upToDate === false) return true;
    return;
}

export const fetchReadingsIfNeeded = (list: any, id: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any) => {
    if (shouldFetchReadings(getState(), list)) {
        return dispatch(fetchReadings(list, id));
    }
}

export const updateReading = (url: any, reading_id: any, user_id: any): ThunkAction<Promise<void | AlertActionTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch) => {
    dispatch(addLoader('updateReading'));
    return apiCall('put', `/readings/${reading_id}`, { url, user_id })
        .then((res: any) => {
            setTimeout(() => {
                dispatch(removeLoader('updateReading'));
                dispatch(addAlert({message: 'Updated reading successfully.', type: 'success'}));
            }, 11000);
            console.log(res.affectedRows);
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}