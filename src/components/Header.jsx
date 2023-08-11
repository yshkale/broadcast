import Hamburger from "../icons/bars.svg";
import About from "../icons/about.svg";

function Header({ onHamburgerClick }) {
  return (
    <div className="sticky backdrop-blur-xl top-0 flex px-6 py-3 items-center border-b border-stone-800 z-50 lg:border-x lg:border-stone-700 lg:max-w-4xl">
      <img
        src={Hamburger}
        onClick={onHamburgerClick}
        className="w-5 invert cursor-pointer"
      />

      <div className="text-center flex-grow">
        <h1 className="text-2xl font-medium">broadcast.</h1>
      </div>

      <img src={About} className="w-3 pt-1" />
    </div>
  );
}

export default Header;
