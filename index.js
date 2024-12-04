const express = require('express');
const axios = require('axios');

const app = express();

app.get('/spotify', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Spotify URL is required' });
    }

    try {
        // Use the external API to fetch Spotify track details
        const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/spotify`, {
            params: { url },
        });

        const data = response.data;

        // Check if the API returned a successful response
        if (data.success) {
            return res.json({ download_link: data.link });
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
