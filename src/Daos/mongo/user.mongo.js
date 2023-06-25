const { userModel } = require("../../models/user.model");

class UserDaoMongo {
  constructor() {
    this.userModel = userModel;
  }

  async usersPaginate(pagina) {
    //page 1 es por defecto, si no recibe la page
    console.log("Log USERSPAGINATE");
    console.log(pagina);

    let users = await userModel.paginate({}, { limit: 10, page: pagina, lean: true });
    console.log("users usersPAGINATE");
    console.log(users);
    return users;
  }

  async getById(uid) {
    return await this.userModel.findOne({ _id: uid });
  }

  async create(newUser) {
    return await this.userModel.create(newUser);
  }

  async update(uid, userUpdate) {
    return this.userModel.findOneAndUpdate({ _id: uid }, userUpdate);
  }

  async delete(uid) {
    return this.userModel.findOneAndDelete({ _id: uid });
  }

  //loginSession
  async loginSession(email) {
    const userDB = await userModel.findOne({ email }).lean();
    return userDB;
  }
}

module.exports = { UserDaoMongo };
