import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import { useEffect, useRef, useState } from 'react';


export const TextAnim: React.FC = (props:{title:string}) => {


	const frame = useCurrentFrame();
	const animDuration = 10;
	const animDelay = 5;
	const signature=interpolate(frame,[100,120],[0,1])

	useEffect(()=>{},[props.title])

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
		<div className='h-screen w-full'>
			<AbsoluteFill className="relative z-20 bg-gradient-to-b from-blue-600 via-blue-500 to-yellow-400 backdrop-blur-sm flex items-start justify-start p-[5%] py-[10%] h-screen w-full">
				<div className='relative text-9xl font-bold w-full text-start text-white/90 flex flex-wrap gap-x-6 gap-y-5 justify-start items-start '>
					{
						props.title.split(" ").map((word, index) => {

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
			{/* <div style={{backgroundPositionY:frame,backgroundPositionX:-frame*3,backgroundImage:`url('https://www.elegantthemes.com/blog/wp-content/uploads/2023/06/What-is-AI-1.jpg')`}} className='h-full w-full flex bg-cover bg-center justify-end items-end p-20 z-10 absolute'>
			</div> */}
		</div>
	);
};
