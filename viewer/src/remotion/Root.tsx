import "../index.css";
import { Composition } from "remotion";
import { TextAnim } from "./textAnimComp";
 
export const MyVideo = () => {
  return (
    <div className="h-screen w-full bg-yellow-300">

      <Composition
        component={TextAnim}
        key={"textAnim"}
        durationInFrames={30*8}
        fps={30}
        id="textAnim"
        width={1080}
        height={1920}
      />
    </div>

  );
};