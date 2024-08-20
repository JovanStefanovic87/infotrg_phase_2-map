import multer from 'multer';
import path from 'path';

// Define storage options
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/icons/articles');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// Create multer instance with storage configuration
const upload = multer({ storage });

export default upload;
