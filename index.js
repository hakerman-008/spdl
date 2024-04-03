const express = require('express');
const axios = require('axios');

const app = express();
const rapidApiKey = 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b';

app.get('/spotify', async (req, res) => {
    try {
        const spotifyUrl = req.query.id;

        if (!spotifyUrl) {
            return res.status(400).json({ error: 'Spotify URL is required' });
        }

        const options = {
            method: 'GET',
            url: 'https://spotify-downloader6.p.rapidapi.com/spotify',
            params: { spotifyUrl },
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'spotify-downloader6.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        if (response.data && response.data.download_link) {
            const { download_link } = response.data;
            return res.json({ download_link });
        } else {
            return res.status(404).json({ error: 'Download link not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
