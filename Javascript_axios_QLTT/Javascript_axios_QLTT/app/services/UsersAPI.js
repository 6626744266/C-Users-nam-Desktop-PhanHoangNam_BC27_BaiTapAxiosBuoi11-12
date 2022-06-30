var baseURL = "https://62bb0738573ca8f832912e50.mockapi.io/Users"



function apiGetUser(search) {
    return axios({
        url: baseURL,
        method: 'GET',
        params: {
            name: search,
        },
    })
}

function apiAddUser(user) {
    return axios({
        url: baseURL,
        method: 'POST',
        data: user,
    }
    )
}

function apiDeleteUser(userId) {
    return axios({
        url: `${baseURL}/${userId}`,
        method: 'DELETE',
    })
}

function apiGetUserDetail(userId) {
    return axios({
      url: `${baseURL}/${userId}`,
      method: "GET",
    });
  }


  function apiUpdateUser(user) {
    return axios({
      url: `${baseURL}/${user.id}`,
      data: user,
      method: "PUT",
    });
  }
  