import { Link } from "react-router-dom";
import nullIsland from "../images/site-files/null_island.png";

function Pagenotfound() {
  return (
    <div className="m-8 my-12 flex flex-col gap-10">
      <h1 className="text-4xl font-bold tracking-wide">
        You&apos;ve washed ashore on null island.
      </h1>
      <p className="text-stone-300">
        Sadly, the party is over. Head back to the{" "}
        <Link to="/" className="border-b border-purple-500">
          mainland
        </Link>{" "}
        if you&apos;re up for some exploring.
      </p>
      <img className="w-full" src={nullIsland} alt="404 page not found image" />
    </div>
  );
}

export default Pagenotfound;
