// this function is responsible for generating image from a text input

const generateImage = async (req, res) => {
    res.status(200).json({
        success: true,
        Masih: "Karimi",
    });
}

module.exports = {generateImage}