module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          first_name: String,
          last_name: String,
          username: String,
          password: String,
          uuid: String,
          access_token: String,
          isLoggedIn: Boolean
        },
        { timestamps: true }
      )
    );
  
    return User;
  };
  