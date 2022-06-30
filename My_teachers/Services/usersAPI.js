var baseURL = "https://62bb0738573ca8f832912e50.mockapi.io/Users"



function apiGetUsers(search) {
    return axios({
        url: baseURL,
        method: 'GET',
        params: {
            name: search,
        },
    })
}
