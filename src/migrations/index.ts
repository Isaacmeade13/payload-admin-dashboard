import * as migration_20241223_103323_initial from './20241223_103323_initial';

export const migrations = [
  {
    up: migration_20241223_103323_initial.up,
    down: migration_20241223_103323_initial.down,
    name: '20241223_103323_initial'
  },
];
