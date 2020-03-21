//export const apiUrl = 'http://10.0.2.2:8000/api/';

import Constants from "expo-constants";
const { manifest } = Constants;

export const apiUrl = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(':8000/api/')
    : 'api.example.com';