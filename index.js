const express = require('express');
const axios = require('axios');

const app = express();

app.get('/spotify', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Spotify ID is required' });
    }

    try {
        // Use the external API to fetch Spotify track details using 'id'
        const response = await axios.get(`https://api.vreden.web.id/api/spotify`, {
            params: { url: id },
        });

        const data = response.data;

        // Check if the API returned a successful response
        if (data.status === 200 && data.result.status) {
            return res.json({ download_link: data.result.music });
        } else {
            return res.status(404).json({ error: 'Failed to fetch download link from the API' });
        }
    } catch (error) {
        console.error('Error fetching from Spotify downloader API:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
