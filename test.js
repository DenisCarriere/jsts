const test = require('tape')
const jsts = require('./')

test('jsts-es', t => {
    t.assert(jsts.GeoJSONWriter)
    t.assert(jsts.BoundaryOp)
    t.end()
})