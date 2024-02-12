import { Html, useProgress } from "@react-three/drei";
import { Vortex } from "react-loader-spinner";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#64748B",
      }}
    >
      <Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
      {progress.toFixed(2)}%
    </Html>
  );
};

export default CanvasLoader;
