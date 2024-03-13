import { Html } from "@react-three/drei";
import { CirclesWithBar } from "react-loader-spinner";

const CanvasLoader = () => {
  return (
    <Html as="div" center>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#43505C"
        innerCircleColor="#f1c40f"
        barColor="white"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Html>
  );
};

export default CanvasLoader;
