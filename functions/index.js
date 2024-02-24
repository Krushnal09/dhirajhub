/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {Storage} = require("@google-cloud/storage");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();
const gcs = new Storage();

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.

    if (!contentType.startsWith('video/')) {
        return functions.logger.log('This is not a video.');
    }

    const fileName = path.basename(filePath);
    const bucket = gcs.bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const tempThumbnailPath = path.join(os.tmpdir(), 'thumb_' + fileName + '.png');
    const thumbnailUploadPath = path.join(path.dirname(filePath), 'thumb_' + fileName + '.png');

    await bucket.file(filePath).download({destination: tempFilePath});
    functions.logger.log('Video downloaded locally to', tempFilePath);

    // Use FFmpeg to generate a thumbnail
    await new Promise((resolve, reject) => {
        ffmpeg(tempFilePath)
            .screenshots({
                timestamps: [1], // Generates a thumbnail at the 1 second mark
                filename: 'thumb_' + fileName + '.png',
                folder: os.tmpdir(),
                size: '320x240'
            })
            .on('end', function() {
                functions.logger.log('Thumbnail generated at', tempThumbnailPath);
                resolve();
            })
            .on('error', function(err) {
                functions.logger.error('Unable to generate thumbnail', err);
                reject(err);
            });
    });

    // Upload the thumbnail back to the bucket
    await bucket.upload(tempThumbnailPath, {destination: thumbnailUploadPath});
    functions.logger.log('Thumbnail uploaded to Storage at', thumbnailUploadPath);

    // Once the thumbnail has been uploaded delete the local file to free up disk space.
    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(tempThumbnailPath);

    return functions.logger.log('Thumbnail generation and upload complete.');
});
