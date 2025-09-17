const fetchUserDataMock = ()=> {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve({
                name: 'Пётр',
                age: 40,
            })
        }, 1000)
    })
}

export const changeUser = () => (dispatch) =>
    fetchUserDataMock().then((userDataFromServer) =>
        dispatch({
            type: 'CHANGE_USER',
            payload: userDataFromServer,
        })
    )