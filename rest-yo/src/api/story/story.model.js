import mongoose, { Schema } from 'mongoose'

const storySchema = new Schema({
  title: {
    type: String
  },
  year: {
    type: String
  },
  author: {
    type: String
  }
}, {
  timestamps: true
})

storySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      year: this.year,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Story', storySchema)
