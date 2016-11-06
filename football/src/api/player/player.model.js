import mongoose, { Schema } from 'mongoose'

const playerSchema = new Schema({
  display_name: {
    type: String
  },
  leagues: [{
    type: Schema.Types.ObjectId,
    ref: 'League'
  }]
}, {
  timestamps: true
})

playerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      display_name: this.display_name,
      leagues: this.leagues,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Player', playerSchema)
