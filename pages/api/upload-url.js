import { Storage } from '@google-cloud/storage';
const path = require('path')
const serviceKey = path.join('config', './keys.json')

export default async function handler(req, res) {


  const storage = new Storage({
   
    keyFilename: serviceKey,
    projectId: 'hwmc-34',
  });

  const bucket = storage.bucket('orcafi');
  const file = bucket.file(req.query.file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}