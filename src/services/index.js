import {ajaxWrapper} from '../helpers/ajaxWrapper';

import {urls} from '../helpers/constant';

export const login = (data) => {
    const url = `${urls.USER}/login`;
    return ajaxWrapper({
        method: 'POST',
        url,
        data,
    }).then(data => data.data)
};

export const registration = (data) => {
    const url = `${urls.USER}/register`;
    return ajaxWrapper({
        method: 'POST',
        url,
        data,
    });
};

export const getAllEvents = () => {
    const url = `${urls.EVENT}`;
    return ajaxWrapper({
        method: 'GET',
        url,
    }).then(data => data.data)
};

export const getOneEvent = (data, id) => {
    const url = `${urls.EVENT}/${id}`;
    return ajaxWrapper({
        method: 'GET',
        url,
        data,
    }).then(data => data.data)
};

export const getOneEventById = (id) => {
    const url = `${urls.EVENT}/article/${id}`;
    return ajaxWrapper({
        method: 'GET',
        url,
    }).then(data => data.data)
};

export const addOneEvent = (data) => {
    const url = `${urls.EVENT}`;
    return ajaxWrapper({
        method: 'POST',
        url,
        data
    }).then(data => data.data)
};

export const updateOneEvent = (data, id) => {
    const url = `${urls.EVENT}/${id}`;
    return ajaxWrapper({
        method: 'PATCH',
        url,
        data
    }).then(data => data.data)
};