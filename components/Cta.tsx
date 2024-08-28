import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const Cta = () => {
  return (
    <div className=" w-full">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="my-5 text-center text-white-200 md:mt-10">
          I’m excited to discuss how we can work together to bring your ideas to
          life.
        </p>
        <a href="/contact">
          <MagicButton
            title="Get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};
export default Cta;
