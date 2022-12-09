const {OpenAIApi, Configuration} = require("openai");

const configuration = new Configuration({
    apiKey: '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',
});

//OpenAIApi.
const openai = new OpenAIApi(configuration);

//openai.api_key = "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";

// this function is responsible for generating image from a text input

const generateImage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "coding guy at forestc",
      n: 2,
      size: "512x512",
    });
    // generated image url
    const imageUrl = response.data.data[0].url;

    // display the response data

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error:
        "Image could not be generated for the entered input please try with another input",
    });
  }
};

module.exports = { generateImage };
