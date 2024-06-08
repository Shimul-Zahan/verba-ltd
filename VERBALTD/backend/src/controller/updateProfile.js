const OfficeSchema = require("../models/officeModel");

const updateProfile = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const updateData = req.body;
        const result = await OfficeSchema.updateOne({ _id }, updateData);

        if (result.nModified === 1) {
            console.log('success');
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            console.log('rejected');
            res.status(404).json({ message: 'Profile not found' });
        }

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = updateProfile