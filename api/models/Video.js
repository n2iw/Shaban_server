module.exports = {
  attributes: {
    lecture: {
      model: 'lecture'
    },

    title: {
      type: 'string'
    },

    url : { 
      type: 'string',
      required: true,
      notNull: true,
      defaultsTo: ""
    }
  }
}


