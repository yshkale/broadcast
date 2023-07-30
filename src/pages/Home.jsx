import Header from "../components/Header";
import Tweet from "../components/Tweet";
import CreateTweet from "../components/CreateTweet";

function Home({ onHamburgerClick, isSideMenuOpen }) {
  return (
    <>
      <div
        className={`h-screen ${
          isSideMenuOpen ? "overflow-hidden blur-[2px]" : "overflow-auto"
        }`}
      >
        <Header onHamburgerClick={onHamburgerClick} />
        <CreateTweet />
        <Tweet />
      </div>
    </>
  );
}

export default Home;
