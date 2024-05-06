import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { useEffect, useRef, useState } from 'react';

export const myCompSchema = z.object({

});

export const TextAnim: React.FC = ({
}) => {


	const frame = useCurrentFrame();
	const animDuration = 10;
	const animDelay = 5;
	const title = "I Got Cold Called by an AI and didn't realize it untill it glitched out 🤯🤯🤯🤯";
	const signature=interpolate(frame,[100,120],[0,1])


	//need to add functionality to limit words on screen.


	function WordFunc(props: { word: string, index: number }) {


		const opacity = interpolate(frame, [(props.index + 1) * animDelay, ((props.index + 1) * animDelay + animDuration)], [0, 1], {
			extrapolateRight: "clamp",
		});

		return (
			<div style={{ opacity: opacity }} className='tracking-tight'>
				{
					props.word
				}
			</div>
		)
	}







	return (
		<div className='h-screen w-full bg-yellow-500'>
			<AbsoluteFill className="relative z-20 bg-gradient-to-b from-yellow-400 via-yellow-500 to-orange-500/60 backdrop-blur-sm flex items-start justify-start p-[5%] py-[10%] h-screen w-full">
				<div className='relative text-9xl font-bold w-full text-start text-black/70 flex flex-wrap gap-x-6 gap-y-5 justify-start items-start '>
					{
						title.split(" ").map((word, index) => {

							return (
								frame > ((index + 1) * animDelay) &&
								<WordFunc word={word} index={index} />
							)
						})
					}
				</div>
				
                    <div className='absolute z-20 h-full w-full flex justify-end items-end p-36'>
                    <div style={{opacity:signature,marginBottom:signature*20}} className='text-6xl z-[99] absolute font-medium tracking-tight px-[10%] bg-white/90 backdrop-blur-xl py-[5%] rounded-l-full rounded-tr-full text-black/90'>Hello, I'm not a bot 🤡 </div>

                    </div>



			</AbsoluteFill>
			<div style={{backgroundPositionY:frame,backgroundPositionX:-frame*3}} className='h-full w-full flex bg-cover bg-center justify-end items-end p-20 z-10 bg-[url("https://media.meer.com/attachments/d3b3f598d670aa511dc81ea8fdb43aa8c7d9049d/store/fill/1090/613/115e0b937c2f533e9ae2d71f25c0c14d41a6a1411f6abe00671aef2e3840/Sophia-Hanson-Robotics-Ltd-speaking-at-the-AI-for-GOOD-Global-Summit-ITU-Geneva-Switzerland-7-9.jpg")] '>
			</div>
		</div>
	);
};
