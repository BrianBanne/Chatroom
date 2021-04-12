



function add_user(req, res) {
    const username = req.params.name;
    print(username);
    let newuser = User(uuid.uuid4().hex, username); //????
    USERS.append(newuser);


    return res.status(200).json({username : username});
}

function delete_user_from_id(req, res) {
    const userId = req.params.id;

    for (let user in USERS) {
        if (user.id() === userId){
            delete user;
            return json("User removed")
        } else {
            json("Cant remove user")
        }
    }

    return res.status(200).json({userId : userId})
}

function get_all_users(req, res) {
    const username = req.params.name;
        let userlist = [];
        //kanskje den skal returnere listen? hmmm
        for (let user in USERS) {
            userlist.append(user)
        }


    return res.status(200).json({username : username})
}

function get_user_from_id(req, res) {
    const userId = req.params.id;
        for (user in USERS) {
            if (user.id === userId) {
                return user;
            }
        }
        //return null?

    return res.status(200).json({userId : userId})
}

module.exports = { add_user };
module.exports = { delete_user_from_id };
module.exports = { get_all_users };
module.exports = { get_user_from_id };