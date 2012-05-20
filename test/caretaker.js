var should = require('should')
var caretaker = require('../index.js')

describe('clean()', function() {
  
  describe('number', function() {
    
    var valid = { num: { default: 10 } }

    it('should parse a numeric value', function(done) {
      var cleaned = caretaker.clean(valid, { num: '7' })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('num', 7)
      done()
    })
    
    it('should return the default value if not present', function(done) {
      var cleaned = caretaker.clean(valid, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('num', 10)
      done()
    })
    
    it('should not be present if not supplied and no default is set', function(done) {
      var noDefault = { num: { type: 'number' } }
      var cleaned = caretaker.clean(noDefault, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.not.have.property('num')
      done()
    })
    
    it('should send an error when the value is not numeric', function(done) {
      var cleaned = caretaker.clean(valid, { num: 'abc' })
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('num', 'is not a number')
      done()
    })
    
    it('should return an error if required and not present', function(done) {
      var required = { num: { type: 'number', required: true } }
      var cleaned = caretaker.clean(required, {})
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('num', 'is required')
      done()
    })

  })
  
  describe('string', function() {
    
    var valid = { str: { default: 'str' } }
  
    it('should parse a string', function(done) {
      var cleaned = caretaker.clean(valid, { str: 8 })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('str', '8')
      done()
    })
    
    it('should return the default value if not present', function(done) {
      var cleaned = caretaker.clean(valid, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('str', 'str')
      done()
    })
    
    it('should not be present if not supplied and no default is set', function(done) {
      var noDefault = { str: { type: 'string' } }
      var cleaned = caretaker.clean(noDefault, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.not.have.property('str')
      done()
    })
    
    it('should return an error if it does not match the regex', function(done) {
      var match = { str: { type: 'string', match: /^[0-9]{1,}$/ } }
      var cleaned = caretaker.clean(match, { str: 'abc' })
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('str', 'is not allowed')
      done()
    })
    
    it('should return an error if required and not present', function(done) {
      var required = { str: { type: 'string', required: true } }
      var cleaned = caretaker.clean(required, {})
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('str', 'is required')
      done()
    })
  
  })
  
  describe('boolean', function() {
    
    var valid = { boo: { default: true } }
  
    it('should parse a true boolean for (true|1)', function(done) {
      var cleaned = caretaker.clean(valid, { boo: 'true' })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('boo', true)
      
      cleaned = caretaker.clean(valid, { boo: '1' })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('boo', true)
      done()
    })
    
    it('should parse a false boolean for (false|0)', function(done) {
      var cleaned = caretaker.clean(valid, { boo: 'false' })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('boo', false)
      
      cleaned = caretaker.clean(valid, { boo: '0' })
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('boo', false)
      done()
    })
    
    it('should return the default value if not present', function(done) {
      var cleaned = caretaker.clean(valid, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('boo', true)
      done()
    })
    
    it('should not be present if not supplied and no default is set', function(done) {
      var noDefault = { boo: { type: 'boolean' } }
      var cleaned = caretaker.clean(noDefault, {})
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.not.have.property('boo')
      done()
    })
    
    it('should return an error if it is something other than (true|1|false|0)', function(done) {
      var cleaned = caretaker.clean(valid, { boo: 'abc' })
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('boo', 'is not allowed')
      done()
    })
    
    it('should return an error if required and not present', function(done) {
      var required = { boo: { type: 'boolean', required: true } }
      var cleaned = caretaker.clean(required, {})
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      cleaned.errors.should.have.property('boo', 'is required')
      done()
    })
  
  })

})