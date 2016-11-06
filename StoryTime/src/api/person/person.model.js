import mongoose, { Schema } from 'mongoose'

const personSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: String
  },
  stories: {
    type: String
  }
}, {
  timestamps: true
})

personSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      age: this.age,
      stories: this.stories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Person', personSchema)
