jasmine.letHelper = (typeof jasmine.letHelper === 'undefined' ? {} : jasmine.letHelper)

jasmine.letHelper.let = function(name, value) {
  if(this.sandbox == undefined) this.sandbox = {}
  
  if(typeof value === 'object') {
    this.sandbox[name] = function() { return jQuery.extend(true, {}, value) }
  } else {
    this.sandbox[name] = function() { return value }
  }
}

jasmine.letHelper.get = function(name) {
  var value
  if(!this.sandbox || this.sandbox[name] == undefined) {
    if(this.parentSuite) return this.parentSuite.get(name)
  } else {
    value = this.sandbox[name]()
    if(typeof value === 'function') {
      return value.apply(this)
    } else {
      return value
    }
  }
}

jasmine.Suite.prototype.let  = jasmine.letHelper.let
jasmine.Suite.prototype.get = jasmine.letHelper.get
jasmine.Spec.prototype.get = function (name) { return this.suite.get(name) }
