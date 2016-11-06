import mongoose, { Schema } from 'mongoose'

const storySchema = new Schema({
  creator: {
    type: String
  },
  title: {
    type: String
  },
  fans: {
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
      creator: this.creator,
      title: this.title,
      fans: this.fans,
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
