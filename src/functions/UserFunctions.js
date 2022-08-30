/* USERS FUNCTIONS */
const getAllUsers = () => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(`${url}/users`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let updatedList = [];
            result.data.forEach((item) => {
                updatedList.push({
                    name: item.name,
                    id: item.id,
                    uid: item.uid,
                });
            });
            setUsersList(arrangeList(updatedList));
        })
        .catch((error) => console.log('error', error));
};

const getDMs = () => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(`${url}/users/recent`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let updatedList = [];
            result.data.forEach((item) => {
                updatedList.push({
                    id: item.id,
                    uid: item.uid,
                    created_at: new Date(item.created_at),
                    updated_at: new Date(item.updated_at),
                });
            });
            updatedList = sortList(removeDuplicate(updatedList), 'user');
            updatedList.forEach((item) => {
                item.created_at = item.created_at.toUTCString();
                item.updated_at = item.updated_at.toUTCString();
            });
            setDMList(updatedList);
        })
        .catch((error) => console.log('error', error));
};

/* GET USER AUTHENTICATION */
const getUserAuth = () => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(`${url}/users`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let updatedList = [];
            result.data.forEach((item) => {
                updatedList.push({
                    name: item.name,
                    id: item.id,
                    uid: item.uid,
                });
            });
            let users = arrangeList(updatedList);
            let uid = localStorage.getItem('uid');
            let user = users.find((user) => user.uid === uid);
            localStorage.setItem('userAuth', JSON.stringify(user));
            setUserAuth(user);
        })
        .catch((error) => console.log('error', error));
};

useEffect(() => {
    if (success) getUserAuth();
}, [success]); // eslint-disable-line react-hooks/exhaustive-deps


useEffect(() => {
    getDMs();
}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
    getAllUsers();
}, [success]); // eslint-disable-line react-hooks/exhaustive-deps


