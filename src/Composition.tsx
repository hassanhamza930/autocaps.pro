import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { useEffect, useRef, useState } from 'react';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
}) => {


	const frame = useCurrentFrame();
	const animDuration = 10;
	const animDelay = 5;
	const [cutOffIndex, setcutOffIndex] = useState(0);
	const title = "I Got Cold Called by an AI and didn't realize it untill it glitched out 🤯🤯🤯🤯";
	const signature=interpolate(frame,[100,120],[0,1])


	//need to add functionality to limit words on screen.


	function WordFunc(props: { word: string, index: number }) {


		const opacity = interpolate(frame, [(props.index + 1) * animDelay, ((props.index + 1) * animDelay + animDuration)], [0, 1], {
			extrapolateRight: "clamp",
		});

		return (
			<div style={{ opacity: opacity }}>
				{
					props.word
				}
			</div>
		)
	}







	return (
		<>
			<AbsoluteFill className="relative z-10 bg-gradient-to-b from-purple-700 to-blue-800 backdrop-blur-xl flex items-start justify-start p-[5%] py-[10%]">
				<div className='relative text-9xl font-bold w-full text-start text-white/80 flex flex-wrap gap-x-6 gap-y-5 justify-start items-start '>
					{
						title.split(" ").map((word, index) => {

							return (
								frame > ((index + 1) * animDelay) &&
								<WordFunc word={word} index={index} />
							)
						})
					}
				</div>


			</AbsoluteFill>
			<div className='h-full w-full flex bg-cover bg-center justify-end items-end p-20 '>
				<div style={{opacity:signature,marginBottom:signature*20}} className='text-6xl z-50 fixed font-medium tracking-tight px-[10%] bg-white/90 backdrop-blur-xl py-[5%] rounded-l-full rounded-tr-full text-black/90'>Hello, I'm not a bot 🤡 </div>
			</div>
		</>
	);
};
