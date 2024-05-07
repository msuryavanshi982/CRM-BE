const Jimp = require("jimp");
const Company_Auth = require("../../Models/CompaniesManagement/companyAuthModel");
const User_Auth = require("../../Models/CompaniesManagement/userAuthModel");
const Listings = require("../../Models/Listings/listingModel");

const createWatermark = async (
  inputImage,
  Ix,
  Iy,
  waterMarkImage,
  Wx,
  Wy,
  Wsx,
  Wsy
) => {
  try {
    let image = await Jimp.read(inputImage);

    if (waterMarkImage) {
      let imageWatermark = await Jimp.read(waterMarkImage);
      imageWatermark.resize(Wsx, Wsy);
      console.log(image);
      image.composite(imageWatermark, Wx, Wy, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,
      });
    }

    if (Ix && Iy) {
      const font = await Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);
      const textWatermark = {
        text: "my Company",
        font: font,
        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      };
      image.print(textWatermark.font, Ix, Iy, textWatermark, 100, 80);
    }

    return image;
  } catch (error) {
    throw error;
  }
};

const waterMark = async (req, res) => {
  const { image, text } = req.body;
  const companyId = req.params.companyid;
  console.log(image);
  try {
    const company = await Company_Auth.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .send({ status: false, message: "company doesn't exist" });
    }

    const users = await User_Auth.find({ company: companyId });
    let imagesWithWatermark = [];
    console.log({ dimag: users });
    for (let user of users) {
      console.log({foo:user})
      const listings = await Listings.find({ user});
      listings.forEach((d) => {
        d.images = JSON.parse(d?.images);
        console.log({sky:d.images})
      });

      for (let listing of listings) {
        for (let img of listing.images) {
          let imgWithWatermark = await createWatermark(
            img,
            230,
            80,
            image,
            30,
            30,
            10,
            10
          );

          imagesWithWatermark.push(imgWithWatermark);
        }
      }
    }

    // Save the images to the database or write them to disk
    // ...
    // Return the result to the client
    res.send({ imagesWithWatermark });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Internal server error" });
  }
};

module.exports = { waterMark };
