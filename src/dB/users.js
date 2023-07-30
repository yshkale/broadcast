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

  {
    id: 6,

    username: "kassandrasanch",
    password: "kassandra@123",
    name: "Kass 🦈",
    email: "kassandrasanch@gmail.com",
    bio: "Sr. Front End Dev | 🎮 | Content creator | building a course | dev memes",
    profilePic: "kassandra.webp",
    website: "https://t.co/BTrsW93nnf",
    location: "Germany",
    joiningDate: { month: 2, year: 2021 },
    followers: [],
    following: [],
  },

  {
    id: 7,

    username: "teqiulasunrise",
    password: "tequila@123",
    name: "teqiula sunrise🍹",
    email: "teqiulasunrise@gmail.com",
    bio: "I never looked at it that way. Voyeur. Amateur Astrologer. Amateur Bartender. Amateur Founder. Just an amateur in general really.",
    profilePic: "tequila.webp",
    website: "https://t.co/BTrsW93nnf",
    location: "Spain",
    joiningDate: { month: 1, year: 2022 },
    followers: [],
    following: [],
  },

  {
    id: 8,

    username: "delba_oliveira",
    password: "delba@123",
    name: "Delba",
    email: "delba_oliveira@gmail.com",
    bio: "Developer Experience @Nextjs and @Vercel ▲",
    profilePic: "delba.webp",
    website: "https://t.co/goRMIDBlYg",
    location: "Australia",
    joiningDate: { month: 2, year: 2023 },
    followers: [],
    following: [],
  },

  {
    id: 9,

    username: "mrncst",
    password: "mrncst@123",
    name: "Mariana Castilho",
    email: "mrncst@gmail.com",
    bio: "Senior product designer vercel▲ Prev @onunivers @uber @getqonto and mentor @10x_Designers",
    profilePic: "mariana.webp",
    website: "https://t.co/pKek0q0mWQ",
    location: "Sydney",
    joiningDate: { month: 5, year: 2019 },
    followers: [],
    following: [],
  },

  {
    id: 10,

    username: "fonsmans",
    password: "fonsmans@123",
    name: "Fons Mans",
    email: "FonsMans@gmail.com",
    bio: "Dutch Designer & Founder of 10x_Designers @OffGrid_Design, soon launching productX.",
    profilePic: "fonsmans.webp",
    website: "https://t.co/9mZR2kxgEe",
    location: "USA",
    joiningDate: { month: 11, year: 2023 },
    followers: [],
    following: [],
  },

  {
    id: 11,

    username: "ryngonzalez",
    password: "ryngonzalez@123",
    name: "Kath Gonzalez ✨",
    email: "ryngonzalez@gmail.com",
    bio: "Designer + Engineer, always building. (Previously) Head of Design Infrastructure ",
    profilePic: "kathryn.webp",
    website: "https://t.co/EELqbQ7gs0",
    location: "Canada",
    joiningDate: { month: 12, year: 2019 },
    followers: [],
    following: [],
  },

  {
    id: 12,

    username: "lilibustosli",
    password: "lili@123",
    name: "Lilibeth Bustos",
    email: "lilibustosli@gmail.com",
    bio: "Colombian Lead Product Designer",
    profilePic: "lilibeth.webp",
    website: "https://t.co/KskBFjzKQ7",
    location: "Portugal",
    joiningDate: { month: 1, year: 2021 },
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
