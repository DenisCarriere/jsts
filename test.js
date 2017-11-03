const test = require('tape')
const jsts = require('./')
const { GeoJSONReader, GeoJSONWriter, BufferOp } = require('./')

test('jsts -- Entry points', t => {
  t.assert(jsts.GeoJSONWriter)
  t.assert(jsts.GeoJSONReader)
  t.assert(jsts.BoundaryOp)
  t.assert(jsts.BufferOp)
  t.assert(jsts.UnionOp)
  t.end()
})

test('jsts -- BufferOp', t => {
  const distance = 10
  const reader = new GeoJSONReader()
  const geom = reader.read({type: 'Point', coordinates: [40, -20]})
  const buffered = BufferOp.bufferOp(geom, distance)
  const writer = new GeoJSONWriter()
  const geojson = writer.write(buffered)
  t.assert(geojson)
  t.end()
})
