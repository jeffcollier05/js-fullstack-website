import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWE1ZTUwYTc2MTMxZmViNzQ0MTUwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTI0MDIxOSwiZXhwIjoxNjcxNDk5NDE5fQ.teWefydQCnqRSPoJd23tm0U_6RE6TWdAbnMB4qaXwQ4";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`},
});