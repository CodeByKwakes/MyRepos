import mongoose, { Schema } from 'mongoose'

const leagueSchema = new Schema({
  display_name: {
    type: String
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, {
  timestamps: true
})

leagueSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      display_name: this.display_name,
      created_by: this.created_by,
      players: this.players,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('League', leagueSchema)
