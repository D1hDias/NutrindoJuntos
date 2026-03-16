import { v2 as cloudinary } from 'cloudinary'
import type { CollectionConfig } from 'payload/types'

export interface CloudinaryAdapterArgs {
  cloudName: string
  apiKey: string
  apiSecret: string
  folder?: string
}

export const cloudinaryAdapter = ({
  cloudName,
  apiKey,
  apiSecret,
  folder = 'nutrindo-juntos',
}: CloudinaryAdapterArgs) => {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  })

  return {
    name: 'cloudinary',

    // Upload handler
    handleUpload: async ({ data, file }) => {
      try {
        const result = await cloudinary.uploader.upload(file.tempFilePath || file.buffer, {
          folder,
          resource_type: 'auto',
          public_id: file.filename?.split('.')[0],
        })

        return {
          ...data,
          url: result.secure_url,
          filename: result.public_id,
          mimeType: file.mimetype,
          filesize: result.bytes,
          width: result.width,
          height: result.height,
        }
      } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw error
      }
    },

    // Delete handler
    handleDelete: async ({ doc }) => {
      try {
        if (doc.filename) {
          await cloudinary.uploader.destroy(doc.filename)
        }
      } catch (error) {
        console.error('Cloudinary delete error:', error)
      }
    },

    // Static handler (optional - for serving files)
    staticHandler: (req, res, next) => {
      // Cloudinary hosts files, so we just pass through
      next()
    },
  }
}
