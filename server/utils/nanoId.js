const { customAlphabet } = require('nanoid')

exports.Id = () => {
  const customAlpha =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoId = customAlphabet(customAlpha, 15)
  const ID = nanoId()
  return ID
}
