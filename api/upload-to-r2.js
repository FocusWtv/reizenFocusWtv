import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Check environment variables
  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('R2 credentials ontbreken:', {
      hasAccountId: !!process.env.R2_ACCOUNT_ID,
      hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY,
    });
    res.status(500).json({ error: 'R2 credentials niet geconfigureerd. Controleer Vercel environment variables.' });
    return;
  }

  try {
    const { fileData, fileName, contentType } = req.body;

    if (!fileData || !fileName) {
      res.status(400).json({ error: 'fileData en fileName zijn verplicht' });
      return;
    }

    const base64 = fileData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    const timestamp = Date.now();
    const ext = fileName.split('.').pop() || 'jpg';
    const prefix = process.env.R2_PREFIX || 'images';
    const key = `${prefix}/${timestamp}-${Math.random().toString(36).slice(2)}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'reizen',
      Key: key,
      Body: buffer,
      ContentType: contentType || 'image/jpeg',
      CacheControl: 'public, max-age=31536000',
    });

    await s3.send(command);

    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error.message || error.toString() || 'Onbekende fout';
    console.error('Error details:', {
      message: errorMessage,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({ error: errorMessage });
  }
}