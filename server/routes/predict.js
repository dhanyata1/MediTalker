// const express = require('express');
// const multer = require('multer');
// const cv = require('opencv4nodejs'); // OpenCV library
// const fs = require('fs'); // For file handling
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Handle file uploads

// router.post('/predict', upload.single('image'), async (req, res) => {
//     try {
//         const img = cv.imread(req.file.path);

//         // Load YOLO model
//         const net = cv.readNetFromDarknet('yolov3.cfg', 'yolov3.weights');
//         net.setInput(cv.blobFromImage(img, 0.00392, new cv.Size(416, 416), new cv.Vec(0, 0, 0), true, false));
//         const layerNames = net.getLayerNames();
//         const outputLayers = layerNames.filter((_, i) => net.getUnconnectedOutLayers().includes(i + 1));

//         // Get predictions
//         const detections = net.forward(outputLayers);

//         // Process detections
//         const medicinePacketDetected = detections.some(detection => {
//             // Check if detection corresponds to a medicine packet
//             // You might need to adjust this logic based on your model's output
//             // Example:
//             // return detection[5] === 'medicine_packet_class_id'; // replace with actual class ID
//         });

//         // Clean up the uploaded file
//         fs.unlinkSync(req.file.path); // Delete the file after processing

//         if (medicinePacketDetected) {
//             res.json({ detected: true });
//         } else {
//             res.json({ detected: false });
//         }
//     } catch (error) {
//         console.error('Error processing image:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
