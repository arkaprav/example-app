const asyncHandler = require("express-async-handler");

//@desc Gets All Users
//@route GET /api/users/all
//@access public

const getAllUser = asyncHandler( async (req, res) => {
    await res.status(200).json({ message: "Get All Users" });
});

//@desc Gets Single User
//@route GET /api/users/:id
//@access public

const getSingleUser = asyncHandler( async (req, res) => {
    await res.status(200).json({ message: `Get User with id: ${req.params.id}` });
})

//@desc Update Single User
//@route put /api/users/:id
//@access public

const updateSingleUser = asyncHandler( async (req, res) => {
    await res.status(200).json({ message: `Updates User with id: ${req.params.id}` });
});


//@desc Deletes All Users
//@route DELETE /api/users/:id
//@access public

const DeleteSingleUser = asyncHandler( async (req, res) => {
    await res.status(200).json({ message: `Deletes User with id: ${req.params.id}` });
});


//@desc Create User
//@route POST /api/users/
//@access public

const createSingleUser = asyncHandler( async (req, res) => {
    const { name, email, address, phone } = await req.body;
    if(!name || !email || !address || !phone){
        res.status(404);
        throw new Error("All Fields are mandatory");
    }
    res.status(200).json({ message: `Creates User with name: ${name}, address: ${address}, email: ${email} and mobile: ${mobile} ` });
});


module.exports = { getAllUser, getSingleUser, updateSingleUser, DeleteSingleUser, createSingleUser };