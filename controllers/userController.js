//@desc Gets All Users
//@route GET /api/users/all
//@access public

const getAllUser = (req, res) => {
    res.status(200).json({ message: "Get All Users" });
}

//@desc Gets Single User
//@route GET /api/users/:id
//@access public

const getSingleUser = (req, res) => {
    res.status(200).json({ message: `Get User with id: ${req.params.id}` });
}

//@desc Update Single User
//@route put /api/users/:id
//@access public

const updateSingleUser = (req, res) => {
    res.status(200).json({ message: `Updates User with id: ${req.params.id}` });
}


//@desc Deletes All Users
//@route DELETE /api/users/:id
//@access public

const DeleteSingleUser = (req, res) => {
    res.status(200).json({ message: `Deletes User with id: ${req.params.id}` });
}


//@desc Create User
//@route POST /api/users/
//@access public

const createSingleUser = (req, res) => {
    res.status(200).json({ message: `Creates User` });
}


module.exports = { getAllUser, getSingleUser, updateSingleUser, DeleteSingleUser, createSingleUser };