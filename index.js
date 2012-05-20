

var clean = function(valid, params) {
  var data = {}
  var errors = {}
  var rtn = { status: 'ok' }
  
  var addError = function(key, message) {
    rtn.status = 'error'
    errors[key] = message
  }
  
  for (var field in valid) {
    var parseF
    var val = valid[field]
    var p = [ val.type, typeof val.default ]
    for (var y=0; y<p.length; y++) {
      var type = p[y]
      if (type in parse) {
        parseF = parse[type]
        break
      }
    }
    
    var parsed = parseF(params[field], val.match)
    if (parsed.err !== undefined) {
      addError(field, parsed.err)
    }
    else {
      if (parsed.val === undefined) {
        if (val.required === true) addError(field, 'is required')
        else if (val.default) data[field] = val.default
      }
      else {
        data[field] = parsed.val
      }
    }    
  }
  
  if (rtn.status === 'ok') rtn.params = data
  else rtn.errors = errors
  return rtn
}


var parse = {
  boolean: function(val) {
    var bool
    val = val || ''
    if (val in { false: 0, 0: 0 }) bool = false
    else if (val in { true: 1, 1: 1 }) bool = true
    else if (val !== '') return { err: 'is not allowed' }
    return { val: bool }
  },
  number: function(val) {
    var num = Number(val)
    if (isNaN(num)) {
      if (val !== undefined) {
        return { err: 'is not a number' }
      }
      num = undefined
    }
    return { val: num }
  },
  string: function(val, match) {
    var str = String(val)
    if (match !== undefined && str.match(match) === null) {
      return { err: 'is not allowed' }
    }
    str = val === undefined ? undefined : str
    return { val: str }
  }
}


module.exports = {
  clean: clean
}