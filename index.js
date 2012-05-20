module.exports.clean = function(valid, params) {
  var data = {}
  var errors = {}
  var rtn = { status: 'ok' }
  
  var addError = function(key, message) {
    rtn.status = 'error'
    errors[key] = message
  }
  
  for (var field in valid) {
    var val = valid[field]
    var parseF = parse.default
    var types = [ val.type, typeof val.default ]
    for (var x=0; x<types.length; x++) {
      var type = types[x]
      if (type in parse) {
        parseF = parse[type]
        break
      }
    }
    
    var parsed = parseF(params[field], val.match)
    if (parsed.err) addError(field, parsed.err)
    else if (parsed.val !== undefined) data[field] = parsed.val
    else if (val.required === true) addError(field, 'is required')
    else if (val.default) data[field] = val.default
  }
  
  if (rtn.status === 'ok') rtn.params = data
  else rtn.errors = errors
  return rtn
}


var parse = {
  boolean: function(val) {
    var bool = { val: val }
    if (bool.val in { false: 0, 0: 0 }) bool.val = false
    else if (bool.val in { true: 1, 1: 1 }) bool.val = true
    else if (bool.val !== undefined) bool.err = 'is not allowed'
    return bool
  },
  default: function(val) {
    return { val: val }
  },
  number: function(val) {
    var num = { val: Number(val) }
    if (isNaN(num.val)) {
      if (val) num.err = 'is not a number'
      else num.val = undefined
    }
    return num
  },
  string: function(val, match) {
    var str = { val: String(val) }
    if (match && str.val.match(match) === null) str.err = 'is not allowed'
    else str.val = val === undefined ? undefined : str.val
    return str
  }
}