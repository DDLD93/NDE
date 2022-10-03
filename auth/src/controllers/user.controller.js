const User = require("../model/user.model");
const {mailer, welcomeMsg} = require("../controller/mailer")
const uuid = require("uuid").v4
 
class UserController{
  constructor(){}

  async addUser(data, imagePath){
    try {
      data.image = imagePath;
      const newUser = new User(data);
      const user = await newUser.save();
      return {ok:true, user};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
 

  async getUsers(){
    try {
      const users = await User.find();
      return {ok:true, users};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  async getUser(id){
    try {
      const user = await User.findById(id);
      return {ok:true, user};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

 
  async updateUser(id,newData){
    try {
      const updatedUser = await User.findByIdAndUpdate(id, newData, {multi:false, new:true});
      return {ok:true, user:updatedUser};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  
  async deleteUser(id){
    try {
      await User.findByIdAndDelete(id);
      return {ok:true, message: "User Deleted" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  

}

module.exports = new UserController();