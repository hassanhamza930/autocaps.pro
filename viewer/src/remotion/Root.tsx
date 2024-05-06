import { Composition } from "remotion";
import { TextAnim } from "./textAnimComp";
 
export const MyVideo = () => {
  return (
    <>
      <Composition
        component={TextAnim}
        durationInFrames={120}
        fps={30}
        id="textAnim"
        width={1920}
        height={1080}
        defaultProps={{ }}
      />
    </>
  );
};