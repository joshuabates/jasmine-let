describe('jasmine.letHelper', function() {
  this.let('subject', 'science')

  it('should get subject', function() {
    expect(this.get('subject')).toEqual('science')
  })

  describe('Nested', function() {
    it('should get subject from parent scope', function() {
      expect(this.get('subject')).toEqual('science')
    })
  })

  describe('Nested override', function() {
    this.let('subject', 'math')

    it('should override subject from parent scope', function() {
      expect(this.get('subject')).toEqual('math')
    })
  })

  describe('Object value', function() {
    this.let('subject', { difficulty: 'easy', name: 'rider' })

    beforeEach(function() {
      var subject = this.get('subject')
      subject.name = 'nocando'
    })
    
    it('should make object immutable', function() {
      expect(this.get('subject').name).toEqual('rider')
    })
  })

  describe('Function value', function() {
    this.let('level', 2)
    this.let('subject', function() { return "Math " + this.get('level')})
    it('should call subject method', function () {
      expect(this.get('subject')).toEqual('Math 2')
    }) 
  })
})
