import { useState } from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import Tweet from "../components/Tweet";
import CreateTweet from "../components/CreateTweet";

function AppLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="lg:mx-[28rem]">
      {isSideMenuOpen && (
        <div className="fixed inset-y-0 left-0 z-40 lg:display-none">
          <SideMenu closeSideMenu={() => setIsSideMenuOpen(false)} />
        </div>
      )}

      <div
        className={`h-screen ${
          isSideMenuOpen ? "overflow-hidden blur-[2px]" : "overflow-auto"
        }`}
      >
        <Header onHamburgerClick={handleHamburgerClick} />
        <CreateTweet />
        <Tweet />
      </div>
    </div>
  );
}

export default AppLayout;
