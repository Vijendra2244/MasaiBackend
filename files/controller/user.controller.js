const UserModel = require("../model/user.model");
const   uploadOnCloudinary  = require("../utils/cloudinary");

const getAllUser = async (req, res) => {
  try {
    const getUsers = await UserModel.find();
    res.status(200).send({ mag: "user find", data: { getUsers } });
  } catch (error) {  
    console.error("Error fetching users:", error);
  res.status(400).send("Error fetching users");
  }
};

const registerUser = async (req, res) => {
  try {
    // console.log(req)
    // console.log(req.file)
    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new Error("<< avatar file is required")
    }

    const avatar = await  uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new Error("avatar file is required>>")
    }

    const { name, email, password } = req.body;
    const userDetails = new UserModel({
      name,
      email,
      password,
      avatar: avatar ? avatar.url : null,
    });
    await userDetails.save();
    res.status(200).send({ mag: "Success", data: userDetails });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllUser, registerUser };
