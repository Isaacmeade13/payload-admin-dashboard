import * as migration_20241223_103323_initial from './20241223_103323_initial';
import * as migration_20241223_112215_move_owner_flags_to_venue from './20241223_112215_move_owner_flags_to_venue';

export const migrations = [
  {
    up: migration_20241223_103323_initial.up,
    down: migration_20241223_103323_initial.down,
    name: '20241223_103323_initial',
  },
  {
    up: migration_20241223_112215_move_owner_flags_to_venue.up,
    down: migration_20241223_112215_move_owner_flags_to_venue.down,
    name: '20241223_112215_move_owner_flags_to_venue'
  },
];
