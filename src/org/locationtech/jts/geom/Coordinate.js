// 2nd Pass
import NumberUtil from '../util/NumberUtil'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Double from '../../../../java/lang/Double'
import Comparable from '../../../../java/lang/Comparable'
import Cloneable from '../../../../java/lang/Cloneable'
import Comparator from '../../../../java/util/Comparator'
import Serializable from '../../../../java/io/Serializable'
import Assert from '../util/Assert'

export default class Coordinate {
  constructor (x, y, z) {
    this.DimensionalComparator = DimensionalComparator
    this.serialVersionUID = 6683108902428366910
    this.NULL_ORDINATE = Double.NaN
    this.X = 0
    this.Y = 1
    this.Z = 2
    this.x = null
    this.y = null
    this.z = null
    if (z) {
      this.x = x
      this.y = y
      this.z = z
    } else if (y) {
      this.x = x
      this.y = y
      this.z = this.NULL_ORDINATE
    } else if (x) {
      const c = x
      this.x = c.x
      this.y = c.y
      this.z = c.z
    } else {
      this.x = 0.0
      this.y = 0.0
      this.z = this.NULL_ORDINATE
    }
  }
  setOrdinate (ordinateIndex, value) {
    switch (ordinateIndex) {
      case Coordinate.X:
        this.x = value
        break
      case Coordinate.Y:
        this.y = value
        break
      case Coordinate.Z:
        this.z = value
        break
      default:
        throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
    }
  }
  equals2D (c, tolerance) {
    if (typeof tolerance !== 'undefined') {
      if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) {
        return false
      }
      if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) {
        return false
      }
      return true
    } else {
      if (this.x !== c.x) {
        return false
      }
      if (this.y !== c.y) {
        return false
      }
      return true
    }
  }
  getOrdinate (ordinateIndex) {
    switch (ordinateIndex) {
      case Coordinate.X:
        return this.x
      case Coordinate.Y:
        return this.y
      case Coordinate.Z:
        return this.z
    }
    throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
  equals3D (other) {
    return this.x === other.x && this.y === other.y && (this.z === other.z || Double.isNaN(this.z) && Double.isNaN(other.z))
  }
  equals (other) {
    if (!(other instanceof Coordinate)) {
      return false
    }
    return this.equals2D(other)
  }
  equalInZ (c, tolerance) {
    return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance)
  }
  compareTo (o) {
    var other = o
    if (this.x < other.x) return -1
    if (this.x > other.x) return 1
    if (this.y < other.y) return -1
    if (this.y > other.y) return 1
    return 0
  }
  clone () {
    try {
      var coord = null
      return coord
    } catch (e) {
      if (e instanceof CloneNotSupportedException) {
        Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable")
        return null
      } else throw e
    } finally {}
  }
  copy () {
    return new Coordinate(this)
  }
  toString () {
    return '(' + this.x + ', ' + this.y + ', ' + this.z + ')'
  }
  distance3D (c) {
    var dx = this.x - c.x
    var dy = this.y - c.y
    var dz = this.z - c.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
  distance (c) {
    var dx = this.x - c.x
    var dy = this.y - c.y
    return Math.sqrt(dx * dx + dy * dy)
  }
  hashCode () {
    var result = 17
    result = 37 * result + Coordinate.hashCode(this.x)
    result = 37 * result + Coordinate.hashCode(this.y)
    return result
  }
  setCoordinate (other) {
    this.x = other.x
    this.y = other.y
    this.z = other.z
  }
  interfaces_ () {
    return [Comparable, Cloneable, Serializable]
  }
  getClass () {
    return Coordinate
  }
  static hashCode (x) {
    const f = Double.doubleToLongBits(x)
    return Math.trunc(f ^ f >>> 32)
  }
}

class DimensionalComparator {
  constructor (dimensionsToTest) {
    this._dimensionsToTest = 2
    if (dimensionsToTest) {
      if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException('only 2 or 3 dimensions may be specified')
      this._dimensionsToTest = dimensionsToTest
    }
  }
  compare (o1, o2) {
    var c1 = o1
    var c2 = o2
    var compX = DimensionalComparator.compare(c1.x, c2.x)
    if (compX !== 0) return compX
    var compY = DimensionalComparator.compare(c1.y, c2.y)
    if (compY !== 0) return compY
    if (this._dimensionsToTest <= 2) return 0
    var compZ = DimensionalComparator.compare(c1.z, c2.z)
    return compZ
  }
  interfaces_ () {
    return [Comparator]
  }
  getClass () {
    return DimensionalComparator
  }
  static compare (a, b) {
    if (a < b) return -1
    if (a > b) return 1
    if (Double.isNaN(a)) {
      if (Double.isNaN(b)) return 0
      return -1
    }
    if (Double.isNaN(b)) return 1
    return 0
  }
}
