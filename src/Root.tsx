import { Composition } from 'remotion';
import './style.css';
import { RecoilRoot } from 'recoil';
import { Player } from "@remotion/player";
import { TextAnim } from '../viewer/src/remotion/textAnimComp';

const RenderRoot = () => {

	const duration = 8;

	return (
		<RecoilRoot>
			<Composition
				id="textAnim"
				component={TextAnim}
				durationInFrames={30 * duration}
				fps={30}
				width={1080}
				height={1920}
			/>
			
		</RecoilRoot>
	);
};


export default RenderRoot;
