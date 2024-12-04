const express = require('express');
const axios = require('axios');

const app = express();


app.get('/spotify', async (req, res) => {
    try {
        const spotifyUrl = req.query.id;
        const userQuery = req.query.query;

        if (spotifyUrl) {
          
            const options = {
                method: 'GET',
                url: 'https://spotify-downloader6.p.rapidapi.com/spotify',
                params: { spotifyUrl },
                headers: {
                    'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
                    'X-RapidAPI-Host': 'spotify-downloader6.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            const { download_link } = response.data;

            return res.json({ download_link });
        } else if (userQuery) {
           
            const options = {
                method: 'GET',
                url: 'https://spotify81.p.rapidapi.com/search',
                params: {
                    q: userQuery,
                    type: 'tracks',
                    offset: '0',
                    limit: '10',
                    numberOfTopResults: '5'
                },
                headers: {
                    'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
                    'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            const { tracks } = response.data;

          
            const trackIDs = tracks.map(track => {
                const trackID = track.uri.split(':')[2];
                return `https://open.spotify.com/track/${trackID}`;
            });

            return res.json({ trackIDs });
        } else {
           
            return res.status(400).json({ error: 'Spotify URL or query is required' });
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
