import { GeoJSONReader, GeoJSONWriter } from '../';

export default function bar() {
  const reader = new GeoJSONReader()
  const geom = reader.read({type: 'Point', coordinates: [10, 20]});
  const writer = new GeoJSONWriter();
  const geojson = writer.write(geom);
  console.log(geojson)
}