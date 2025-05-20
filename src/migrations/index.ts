import * as migration_20250414_013733 from './20250414_013733';
import * as migration_20250414_022002 from './20250414_022002';
import * as migration_20250520_125520 from './20250520_125520';

export const migrations = [
  {
    up: migration_20250414_013733.up,
    down: migration_20250414_013733.down,
    name: '20250414_013733',
  },
  {
    up: migration_20250414_022002.up,
    down: migration_20250414_022002.down,
    name: '20250414_022002',
  },
  {
    up: migration_20250520_125520.up,
    down: migration_20250520_125520.down,
    name: '20250520_125520'
  },
];
