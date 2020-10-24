/* Useful utility functions */ 
import React from 'react';
import axios from 'axios';

const user = "bhouse";
const pass = "";
const org = "capstone2020";

// post creds to retrieve jwt to make other calls 
export function login() {
    var url = `http://127.0.0.1:5000/login/jama/basic?username=${user}&password=${pass}&organization=${org}`;

    axios
    .post(url)
    .then(response => {
        console.log("success");
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
        // add it to the log on server
    });
}
