const test = require('tape')
const jsts = require('./')

test('jsts-es', t => {
    t.assert(jsts.GeoJSONWriter)
    t.assert(jsts.GeoJSONReader)
    t.assert(jsts.BoundaryOp)
    t.assert(jsts.BufferOp)
    t.assert(jsts.UnionOp)
    t.end()
})
