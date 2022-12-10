const {OpenAIApi, Configuration} = require("openai");

const configuration = new Configuration({
    apiKey: '',
});

//OpenAIApi.
const openai = new OpenAIApi(configuration);


// this function is responsible for generating image from a text input

const generateImage = async (req, res) => {
    // this is for getting the prompt from the user
    const { prompt, size, n } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'
  try {
    openai.createImage({})
    const response = await openai.createImage({prompt, n, size:imageSize});
    // generated image url
    //const imageUrl = response.data.data[0].url;
    const imageUrls = response.data.data.map((image) => image.url);


    // display the response data

    res.status(200).json({
      success: true,
      data: imageUrls,
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
