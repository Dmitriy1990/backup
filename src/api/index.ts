import axios from 'axios';

export const client = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers:{
      "Access-Control-Allow-Origin": "*",
      // Authorization: "Basic dGdfYWRtaW46MTIz",
  }
})

client.interceptors.request.use (
    function (config) {
      const authStorage = localStorage.getItem('auth')
      const isAuth = authStorage ? JSON.parse(authStorage) : null

      if (isAuth) {
        const username = isAuth?.lusername ?  isAuth.lusername : ''
        const password = isAuth?.lpassword ?  isAuth.lpassword : ''
        const token = btoa(`${username}:${password}`)
        config.headers.Authorization = `Basic ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject (error);
    }
);

export const ENDPOINTS = {
  REGISTRATION:{
    CREATE_SESSION: '/api/registration/create-session',
    CREATE_ACCOUNT: '/api/registration/create-account',
    CHECK_SESSION: '/api/registration/check-session',
    AUTH: '/api/registration/auth_process'
  },
  MANUAL_WORK:{
    SYNC_MESSAGES: '/api/manual-work/sync-messages',
    SYNC_MEDIA: '/api/manual-work/sync-media',
    SYNC_DIALOGS: '/api/manual-work/sync-dialogs',
    CREATE_ACCOUNT: '/api/manual-work/create-account',
    DELETE_MESSAGE: '/api/manual-work/delete-message',
    DELETE_DIALOG: '/api/manual-work/delete-dialog',
  },
  SHEDULER:{
    RESUME: '/api/scheduler/resume',
    PAUSE: '/api/scheduler/pause',
    CREATE_SYNC_JOB: '/api/scheduler/create-sync-job',
    CREATE_DELETE_DIALOG_JOB: '/api/scheduler/create-delete-dialog-job',
    LIST: '/api/scheduler/list',
    DELETE: '/api/scheduler/delete'
  },
  USERS:{
    ENABLE_DISABLE_USER: '/api/users/enable-disable-user',
    DELETE_LINKED_TELEGRAM_ACCOUNT: '/api/users/delete-linked-telegram-account',
    CREATE_USER: '/api/users/create-user',
    CHANGE_PASSWORD: '/api/users/change-password',
    ADD_LINKED_TELEGRAM_ACCOUNT: '/api/users/add-linked-telegram-account',
    GET_LINKED_TELEGRAM_ACCOUNTS: '/api/users/get-linked-telegram-accounts',
    GET_LINKED_TELEGRAM_ACCOUNT_CURRENT: '/api/users/get-linked-telegram-accounts-current-user',
    USER_LIST: '/api/users/user-list',
    GET_USER_ROLES: '/api/users/get-user-roles'
  },
  EXPORT:{
    MESSAGES: '/api/export/messages',
    MESSAGES_XLSX: '/api/export/messages-xlsx',
    GET_MEDIA: '/api/export/get-media',
    GET_MEDIA_ALL: '/api/export/get-media-all',
    GET_DIALOGS: '/api/export/dialogs',
    GET_DIALOGS_XLSX: '/api/export/dialogs-xlsx',
    GET_ACCOUNTS: '/api/export/accounts',
    GET_ACCOUNTS_XLSX: '/api/export/accounts-xlsx',
  }
}