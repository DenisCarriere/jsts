import { GeoJSONReader, GeoJSONWriter, BufferOp } from '../';

export default function foo() {
  const distance = 10
  const reader = new GeoJSONReader()
  const geom = reader.read({type: 'Point', coordinates: [40, -20]});
  const buffered = BufferOp.bufferOp(geom, distance);
  const writer = new GeoJSONWriter();
  const geojson = writer.write(buffered);
  console.log(geojson)
}