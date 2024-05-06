import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './Composition';
import './style.css';
import { RecoilRoot } from 'recoil';

export const RemotionRoot: React.FC = () => {

	const duration=8;

	return (
		<RecoilRoot>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={30 * duration}
				fps={30}
				width={1080}
				height={1080}
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion with Tailwind CSS',
					titleColor: '#000000',
					logoColor: '#00bfff',
				}}
			/>
		</RecoilRoot>
	);
};
