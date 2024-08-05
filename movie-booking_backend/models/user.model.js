module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          userid: Number,
          email: String,
          first_name: String,
          last_name: String,
          username: String,
          password: String,
          contact: Number,
          role: String,
          uuid: String,
          access_token: String,
          isLoggedIn: Boolean,
          access_token: String,
          coupens: { type: Array, default: [] },
          bookingRequests: { type: Array, default: [] }
        },
        { timestamps: true }
      )
    );
  
    return User;
  };
  