import * as migration_20250404_142312 from './20250404_142312';
import * as migration_20250405_154524 from './20250405_154524';
import * as migration_20250407_082029 from './20250407_082029';
import * as migration_20250409_140136 from './20250409_140136';
import * as migration_20250409_143209 from './20250409_143209';
import * as migration_20250410_111012 from './20250410_111012';
import * as migration_20250411_101325 from './20250411_101325';
import * as migration_20250413_071542 from './20250413_071542';
import * as migration_20250609_164222 from './20250609_164222';

export const migrations = [
  {
    up: migration_20250404_142312.up,
    down: migration_20250404_142312.down,
    name: '20250404_142312',
  },
  {
    up: migration_20250405_154524.up,
    down: migration_20250405_154524.down,
    name: '20250405_154524',
  },
  {
    up: migration_20250407_082029.up,
    down: migration_20250407_082029.down,
    name: '20250407_082029',
  },
  {
    up: migration_20250409_140136.up,
    down: migration_20250409_140136.down,
    name: '20250409_140136',
  },
  {
    up: migration_20250409_143209.up,
    down: migration_20250409_143209.down,
    name: '20250409_143209',
  },
  {
    up: migration_20250410_111012.up,
    down: migration_20250410_111012.down,
    name: '20250410_111012',
  },
  {
    up: migration_20250411_101325.up,
    down: migration_20250411_101325.down,
    name: '20250411_101325',
  },
  {
    up: migration_20250413_071542.up,
    down: migration_20250413_071542.down,
    name: '20250413_071542',
  },
  {
    up: migration_20250609_164222.up,
    down: migration_20250609_164222.down,
    name: '20250609_164222'
  },
];
