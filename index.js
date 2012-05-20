

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
    
    var parsed = parseF(params[field])
    if (parsed.err !== undefined) {
      addError(field, parsed.err)
    }
    else {
      if (parsed.val === undefined) {
        if (val.required === true) addError(field, 'required')
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
  number: function(val) {
    var num = Number(val)
    if (isNaN(num)) {
      if (val !== undefined) {
        return { err: 'not a number' }
      }
      num = undefined
    }
    return { val: num }
  }
}


module.exports = {
  clean: clean
}