const express = require('express');
const cors = require('cors');
const app = express();
const Replicate = require("replicate");

const replicate = new Replicate({ auth: 'r8_Wz7vU9bvlagxiuXv6HAungKjetnH7vj26Ii3r' });

app.use(cors());

app.get('/', async (req, res) => {
    const { vidUrl } = req.query;
    
    console.log("receieved virUdl starting transcription");

    const input = {
        url: vidUrl
    };
    
    const output = await replicate.run("turian/insanely-fast-whisper-with-video:4f41e90243af171da918f04da3e526b2c247065583ea9b757f2071f573965408", { input });
    console.log(output)
    console.log("transcription done");


    // res.json('Hello, world! ' + vidUrl);
    res.json(output);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
