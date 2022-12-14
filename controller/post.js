const Post = require("../model/post");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const createPost = async (request, response) => {
    const data = request.body;
    console.log(request.headers);

    // The ? mark checks for optional
    const token = request.headers?.authorization?.split(" ")[1];

    if (token) {
        const decodedValue = jwt.decode(token, { complete: true });

        const findUser = await User.findOne({ email: decodedValue?.payload?.email });

        if (findUser) {
            const newPost = new Post({
                expenseOrIncome: data.expenseOrIncome,
                amount: data.amount,
                user: findUser._id
            })

            try {
                const output = await newPost.save();
                return response.status(201).json({
                    message: "Post Succesfully Created",
                    data: output
                })
            } catch (error) {
                return response.status(500).json({
                    message: "There was an error",
                    error
                })
            }
        } else {
            return response.status(404).json({
                message: "User was not Found!"
            })
        }

    } else {
        return response.status(401).json({
            message: "Token required!",
        })
    }


}

const getAllPosts = async (request, response) => {
    try {
        const data = await Post.find().populate({
            path: "user"
        });

        return response.status(200).json({
            message: "Posts found Succesfully",
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const deletePost = async (request, response) => {

    try {
        const id = request.params.id;
        await Post.findByIdAndDelete(id);

        return response.status(200).json({
            message: "Post Deleted Succesfully",

        })

    } catch (error) {
        return response.status(500).json({
            message: "There was an error",
            error
        })
    }


}

module.exports = {
    createPost,
    getAllPosts,
    deletePost
}