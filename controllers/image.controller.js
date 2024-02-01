import imageModel from "../Models/image.model.js";

export const getImage = async (req, res) => {
    try {
        const image = await imageModel.findOne({ name: req.params.id });

        if (!image) {
            res.status(404).json({
                error: {
                    msg: "No image found"
                }
            });
        } else {
            const buffer = image.img.data;
            res.contentType('image/jpeg');
            res.send(buffer);
        }
    } catch (error) {
        res.status(500).json({
            error: {
                msg: "ID is not valid or try again later"
            }
        });
    }
};
