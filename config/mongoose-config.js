const mongoose = require('mongoose')
const __setOptions = mongoose.Query.prototype.setOptions

mongoose.Query.prototype.setOptions = function(options, overwrite) {
  __setOptions.apply(this, arguments)
  if (this.options.lean == null) this.options.lean = true
  return this
}
