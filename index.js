const express = require('express');
const axios = require('axios');

const app = express();

app.get('/spotify', async (req, res) => {
    try {
        const spotifyUrl = req.query.id;
        const userQuery = req.query.query;

        if (spotifyUrl) {
            const apiUrl = `https://tools.betabotz.eu.org/tools/spotifydl?url=${spotifyUrl}`;
            const response = await axios.get(apiUrl);

            if (response.data.status === 200) {
                const download_link = response.data.result;
                return res.json({ download_link });
            } else {
                return res.status(404).json({ error: 'Download link not found' });
            }
        } else if (userQuery) {
            return res.status(400).json({ error: 'Searching by query is not supported with this API' });
        } else {
            return res.status(400).json({ error: 'Spotify URL is required' });
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
