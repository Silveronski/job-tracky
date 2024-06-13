const cloudinary = require('cloudinary').v2;
const { BadRequestError } = require('../errors');

const uploadAvatarToCloud = async (avatar) => {
    const maxSize = 1024 * 1024 // 1MB  
    if (!avatar.mimetype.startsWith('image')) throw new BadRequestError('Please upload an image file');
    if (avatar.size > maxSize) throw new BadRequestError('Please upload an image smaller than 1MB');
    const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: 'avatars',
        use_filename: true,
        unique_filename: false,
    });
    return result.secure_url;
}

module.exports = uploadAvatarToCloud;