const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

const register = async (req, res) => {
  //colect data from request
  const { name, email, password } = req.body;

  //check if user already exists and returns true/false
  const user = await User.findOne({ email });

  //if user already exists in db, end request
  if (user) {
    res.status(422).json({
      errors: ["Por favor, utilize outro e-mail"],
    });
    return;
  }

  //generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //checa usuário existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }
  //checa senha do usuário do banco é a mesma da requisição
  if (!bcrypt.compare(password, user.password)) {
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  //retorna usuário logado com token

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
    profileImage: user.profileImage,
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

module.exports = { register, login, getCurrentUser };
