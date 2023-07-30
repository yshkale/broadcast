import { useState } from "react";
import Home from "../pages/Home";
import SideMenu from "../components/SideMenu";

function AppLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      {isSideMenuOpen && (
        <div className="fixed inset-y-0 left-0 z-40">
          <SideMenu closeSideMenu={() => setIsSideMenuOpen(false)} />
        </div>
      )}

      <Home
        onHamburgerClick={handleHamburgerClick}
        isSideMenuOpen={isSideMenuOpen}
      />
    </>
  );
}

export default AppLayout;
