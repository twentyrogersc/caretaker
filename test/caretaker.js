var should = require('should')

var caretaker = require('../index.js')
console.log(caretaker)

describe('clean()', function() {
  
  describe('number', function() {
    
    var valid = { num: { default: 10 } }

    it('should parse a numeric value', function(done) {
      var cleaned = caretaker.clean({ num: '7' }, valid)
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('num', 7)
      done()
    })
    
    it('should return the default value if not present', function(done) {
      var cleaned = caretaker.clean({}, valid)
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.should.have.property('num', 10)
      done()
    })
    
    it('should not be present', function(done) {
      var noDefault = { num: { type: 'number' } }
      var cleaned = caretaker.clean({}, noDefault)
      cleaned.should.have.property('status', 'ok')
      cleaned.should.have.property('params')
      cleaned.params.shouldnt.have.property('num')
      done()
    })
    
    it('should send an error when the value is not numeric', function(done) {
      var cleaned = caretaker.clean({ num: 'abc' }, valid)
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      done()
    })
    
    it('should return an error if required and not present', function(done) {
      var required = { num: { type: 'number', required: true } }
      var cleaned = caretaker.clean({}, required)
      cleaned.should.have.property('status', 'error')
      cleaned.should.have.property('errors')
      done()
    })


  })

})