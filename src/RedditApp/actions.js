'use strict';
import fetch from 'isomorphic-fetch';

export const SELECT_REDDIT = 'SELECT_REDDIT';

export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    };
}

export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    };
}

// network request actions
export const REQUEST_POSTS = 'REQUEST_POSTS';

export function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

export function fetchPosts(reddit) {
    return function (dispatch) {
        dispatch(requestPosts(reddit));
        return fetch(`http://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json)
            .then(json =>
                dispatch(receivePosts(reddit, json))
            );

    };
}