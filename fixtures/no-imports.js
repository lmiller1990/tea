const StringTools = {
  upcase(str) {
    return str.toUpperCase()
  },
}

describe('StringTools', () => {
  describe('upcase', () => {
    it('upcases the input', () => {
      const result = StringTools.upcase('message')
      demand(result).to.eql('MESSAGE')
    })
  })

  describe('example failure', () => {
    it('misunderstood genius', () => {
      demand(2 + 2).to.eql(22)
    })
  })
})
