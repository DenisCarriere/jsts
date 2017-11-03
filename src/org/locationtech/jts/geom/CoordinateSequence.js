// 2nd pass
import Cloneable from '../../../../java/lang/Cloneable'

export default class CoordinateSequence {
  constructor () {
    this.X = 0
    this.Y = 1
    this.Z = 2
    this.M = 3
  }
  setOrdinate (index, ordinateIndex, value) {}

  size () {}
  getOrdinate (index, ordinateIndex) {}

  getCoordinate (index, coord) {
    this.index = index
    this.coord = coord
  }
  getCoordinateCopy (i) {}
  getDimension () {}
  getX (index) {}
  clone () {}
  expandEnvelope (env) {}
  copy () {}
  getY (index) {}
  toCoordinateArray () {}
  interfaces_ () {
    return [Cloneable]
  }
  getClass () {
    return CoordinateSequence
  }
}
