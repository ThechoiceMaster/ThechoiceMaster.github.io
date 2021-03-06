import * as local from './local';

export const BASE_URL = local.BASE_URL
export const USER_ID = "ID"

export const FETCHING = "FETCHING";
export const FAILED = "FAILED";
export const SUCCESS = "SUCCESS";
export const LOGOUT = "LOGOUT";

// export const imageUrl = "http://localhost:4000";

export const LOGIN_STATUS = "LOGIN_STATUS";
export const USER_LEVEL = "USER_LEVEL";
export const USER_NAME = "USER_NAME";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const server = {
    //post
    LOGIN_URL: `${BASE_URL}api/user/login`,
    REGISTER_URL: `${BASE_URL}api/user/register`,
    INSERT_VDO: `${BASE_URL}api/admin/vdo`,
    INSERT_NAME: `${BASE_URL}api/admin/name`,
    FILE_INPUT_IMAGE: `${BASE_URL}api/file/upload`,

    //get
    GET_SUBJECT_DATA: `${BASE_URL}api/admin/subject`,
    FILE_GET_IMAGE: `${BASE_URL}api/images`,

    //delete
    DELETE_NAME: `${BASE_URL}api/admin/name`,
    DELETE_VDO: `${BASE_URL}api/admin/vdo`,

    //update
    UPDATE_VDO: `${BASE_URL}api/admin/vdoUpdate`,

};