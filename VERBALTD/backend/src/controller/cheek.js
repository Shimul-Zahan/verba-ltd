
const cheek = async (req, res, next) => {
    res.status(200).json({ message: 'cheek passed successfully' });
}

module.exports = cheek;