import Coordinate from './Coordinate'
import HashMap from '../../../../java/util/HashMap'
import Double from '../../../../java/lang/Double'
import Integer from '../../../../java/lang/Integer'
import Comparable from '../../../../java/lang/Comparable'
import Serializable from '../../../../java/io/Serializable'

export default class PrecisionModel {
  constructor () {
    this.Type = Type
    this.serialVersionUID = 7777263578777803835
    this.FIXED = new Type('FIXED')
    this.FLOATING = new Type('FLOATING')
    this.FLOATING_SINGLE = new Type('FLOATING SINGLE')
    this.maximumPreciseValue = 9007199254740992.0
    this._modelType = null
    this._scale = null

    if (arguments.length === 0) {
      this._modelType = PrecisionModel.FLOATING
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof Type) {
        let modelType = arguments[0]
        this._modelType = modelType
        if (modelType === PrecisionModel.FIXED) {
          this.setScale(1.0)
        }
      } else if (typeof arguments[0] === 'number') {
        let scale = arguments[0]
        this._modelType = PrecisionModel.FIXED
        this.setScale(scale)
      } else if (arguments[0] instanceof PrecisionModel) {
        let pm = arguments[0]
        this._modelType = pm._modelType
        this._scale = pm._scale
      }
    }
  }
  equals (other) {
    if (!(other instanceof PrecisionModel)) {
      return false
    }
    var otherPrecisionModel = other
    return this._modelType === otherPrecisionModel._modelType && this._scale === otherPrecisionModel._scale
  }
  compareTo (o) {
    var other = o
    var sigDigits = this.getMaximumSignificantDigits()
    var otherSigDigits = other.getMaximumSignificantDigits()
    return new Integer(sigDigits).compareTo(new Integer(otherSigDigits))
  }
  getScale () {
    return this._scale
  }
  isFloating () {
    return this._modelType === PrecisionModel.FLOATING || this._modelType === PrecisionModel.FLOATING_SINGLE
  }
  getType () {
    return this._modelType
  }
  toString () {
    var description = 'UNKNOWN'
    if (this._modelType === PrecisionModel.FLOATING) {
      description = 'Floating'
    } else if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
      description = 'Floating-Single'
    } else if (this._modelType === PrecisionModel.FIXED) {
      description = 'Fixed (Scale=' + this.getScale() + ')'
    }
    return description
  }
  makePrecise () {
    if (typeof arguments[0] === 'number') {
      let val = arguments[0]
      if (Double.isNaN(val)) return val
      if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
        var floatSingleVal = val
        return floatSingleVal
      }
      if (this._modelType === PrecisionModel.FIXED) {
        return Math.round(val * this._scale) / this._scale
      }
      return val
    } else if (arguments[0] instanceof Coordinate) {
      let coord = arguments[0]
      if (this._modelType === PrecisionModel.FLOATING) return null
      coord.x = this.makePrecise(coord.x)
      coord.y = this.makePrecise(coord.y)
    }
  }
  getMaximumSignificantDigits () {
    var maxSigDigits = 16
    if (this._modelType === PrecisionModel.FLOATING) {
      maxSigDigits = 16
    } else if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
      maxSigDigits = 6
    } else if (this._modelType === PrecisionModel.FIXED) {
      maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))
    }
    return maxSigDigits
  }
  setScale (scale) {
    this._scale = Math.abs(scale)
  }
  interfaces_ () {
    return [Serializable, Comparable]
  }
  getClass () {
    return PrecisionModel
  }
  mostPrecise (pm1, pm2) {
    if (pm1.compareTo(pm2) >= 0) return pm1
    return pm2
  };
}

class Type {
  constructor () {
    this.serialVersionUID = -5528602631731589822
    this.nameToTypeMap = new HashMap()
    this._name = null
    let name = arguments[0]
    this._name = name
    this.nameToTypeMap.put(name, this)
  }
  readResolve () {
    return this.nameToTypeMap.get(this._name)
  }
  toString () {
    return this._name
  }
  interfaces_ () {
    return [Serializable]
  }
  getClass () {
    return Type
  }
}
