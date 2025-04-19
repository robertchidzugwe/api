const express = require("express");
const axios = require("axios");
const https = require("https");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.post("/proxy/billing", async (req, res) => {
  try {
    const response = await axios.post(
      "https://197.248.169.230:450/api/Enforcement/Billing",
      req.body,
      { httpsAgent }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ message: "Internal proxy error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
