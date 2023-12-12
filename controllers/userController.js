const getAllUser = (req, res) => {
    res.status(200).json({ message: "Get All Users" });
}

module.exports = { getAllUser };