const flowURL =
  "https://3b095fb55afdedef9492cc6f8add41.4e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/96e00b17f82a4c26a3702e3d362688e0/triggers/manual/paths/invoke?api-version=1";
const flowSecret = "firmonboarding123";
const expectedApiKey = "firmonboarding123";

const axios = require("axios");

const FLOW_URL = 'https://3b095fb55afdedef9492cc6f8add41.4e.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/96e00b17f82a4c26a3702e3d362688e0/triggers/manual/paths/invoke?api-version=1';

// API key (secret) - store this securely, e.g., in environment variables (process.env.FLOW_SECRET)
const FLOW_SECRET = 'firmonboarding123';

const onBoarding = async (req, res) => {
  const data = req.body; // Expect JSON like your example: { "CompanyName": "...", ... }

  if (!data || Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid or empty JSON data provided" });
  }

  try {
    const response = await axios.post(FLOW_URL, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": FLOW_SECRET.toLowerCase(), // Lowercased as per your flow condition
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json(); // Optional: Parse response if your flow returns data
      res
        .status(200)
        .json({
          message: "Data successfully sent to Power Automate flow",
          result,
        });
    } else {
      res
        .status(response.status)
        .json({ error: `Failed to send data: ${response.statusText}` });
    }
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).json({ error: "Server error while sending data to flow" ,error});
  }

  // Add flow_secret to the request body
  // data.flow_secret = flowSecret;

  // try {
  //   const response = await axios.post(flowURL, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${flowSecret}`
  //     },
  //   });
  //   console.log("api onbo response",response)

  //   // Handle successful response
  //   if (response.status === 201) {
  //     res.status(201).send('Data successfully sent to Power Automate');
  //   } else {
  //     res.status(400).send('Error occurred while submitting data');
  //   }
  // } catch (error) {
  //   // Handle error response
  //   console.log("error",error)
  //   res.status(500).json({error:'Internal Server Error',error});
  // }
};

module.exports = {
  onBoarding,
};
