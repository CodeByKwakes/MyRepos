import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true
})

articleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Article', articleSchema)
