import axios from "axios";

const AccessKey = "6cz9g4vsqA7Xih_xyixnPmFNBaN8v7mEOHUJySxFkuU";

axios.defaults.baseURL = "https://api.unsplash.com/search/"

export async function searchRequest(query, page) {
    return axios.get("photos", {
        params: {
            query: query,
            client_id: AccessKey,
            page,
            per_page: 12,
            orientation: "landscape"
        }
    })
}

// const ApplicationID = "651148";
// const SecretKey = "GDBOl9E9R-1OoSiMrZKqPEyVBx_OJJhhtYXQtvseWtY";