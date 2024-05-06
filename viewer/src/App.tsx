import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Player } from '@remotion/player'
import { TextAnim } from './remotion/textAnimComp'

function App() {
  const [count, setCount] = useState(0)
  const duration = 8

  return (
    <div style={{backgroundImage:`url("https://cdn.dribbble.com/users/600626/screenshots/2944155/loading_img.gif")`}} className='h-screen w-full bg-repeat bg-center'>
      <div className='h-full w-full bg-purple-600/90 p-10 flex justify-start items-start backdrop-blur-xl'>

      <Player
				autoPlay
				loop
        className='h-full rounded-xl opacity-90'
				component={TextAnim}
				durationInFrames={30*duration}
        posterFillMode='player-size'
        compositionHeight={1920}
        compositionWidth={1080}
        style={{ height: '100%' }}
        fps={30}
			/>

      </div>
      

    </div>
  )
}

export default App
