const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Spotify downloader endpoint
app.get('/spotify', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Missing 'id' parameter. Provide a Spotify track URL.",
        });
    }

    try {
        // Make request to the external API
        const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(id)}`);
        const data = response.data;

        // Check if the response indicates success
        if (data.success) {
            // Format the response with a download_link
            const formattedResponse = {
                success: true,
                metadata: data.metadata,
                download_link: data.link,
            };
            return res.json(formattedResponse);
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch data from the Spotify downloader API.",
            });
        }
    } catch (error) {
        console.error('Error fetching Spotify data:', error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
