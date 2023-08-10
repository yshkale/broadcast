const users = [
  {
    id: 1,

    username: "yshkale",
    password: "yash@123",
    name: "Yash Kale",
    email: "yashkale@gmail.com",
    bio: "Frontend developer and solopreneur",
    profilePic: "yshkale.webp",
    website: "https://yashkale.vercel.app",
    location: "India",
    joiningDate: { month: 5, year: 2022 },
    followers: [],
    following: [],
  },

  {
    id: 2,

    username: "cristina_dev",
    password: "cristina@123",
    name: "Cristina",
    email: "cristinadev12@gmail.com",
    bio: "Self-starter #Frontend Developer learning #TypeScript #Angular  • #WomenInTech • Food 🍜 • Reading 📚 • 🇮🇹🇲🇩🇺🇦",
    profilePic: "Cristina.webp",
    website: "https://t.co/YmEArXGCzR",
    location: "New York",
    joiningDate: { month: 4, year: 2021 },
    followers: [],
    following: [],
  },

  {
    id: 3,

    username: "pikacodes",
    password: "pikacodes@123",
    name: "Pika Codes",
    email: "pikacodes12@gmail.com",
    bio: "web dev lead ~ i like coding, making websites for non-profits, and games",
    profilePic: "pikacodes.webp",
    website: "https://t.co/bZk6G4WJ0Q",
    location: "Paris",
    joiningDate: { month: 5, year: 2020 },
    followers: [],
    following: [],
  },

  {
    id: 4,

    username: "florinpop17",
    password: "florinpop@123",
    name: "Florin Pop",
    email: "florinpop17@gmail.com",
    bio: "Helping developers learn faster :)",
    profilePic: "florinpop.webp",
    website: "https://t.co/iaQCOKEySr",
    location: "France",
    joiningDate: { month: 7, year: 2023 },
    followers: [],
    following: [],
  },

  {
    id: 5,

    username: "_georgemoller",
    password: "george@123",
    name: "George Moller",
    email: "georgemoller@gmail.com",
    bio: "Frontend Engineer with 10+yr of experience. I help developers excel at frontend development by avoiding common mistakes and following best practices.",
    profilePic: "george.webp",
    website: "https://t.co/D6iGlMmq6E",
    location: "Dubai",
    joiningDate: { month: 8, year: 2021 },
    followers: [],
    following: [],
  },
];

export function addUser(user) {
  users.push(user);
}

export function profileData(user) {
  const newUser = users.find((u) => u.id === users[users.length - 1].id);
  newUser.bio = user.bio;
  newUser.website = user.website;
  newUser.location = user.location;
  newUser.joiningDate = user.joiningDate;
}

export default users;
