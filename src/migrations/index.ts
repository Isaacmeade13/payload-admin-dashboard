import * as migration_20241223_103323_initial from './20241223_103323_initial';
import * as migration_20241223_112215_move_owner_flags_to_venue from './20241223_112215_move_owner_flags_to_venue';
import * as migration_20241223_122640_add_min_booking_hours_and_address_fields from './20241223_122640_add_min_booking_hours_and_address_fields';
import * as migration_20241224_114547 from './20241224_114547';
import * as migration_20241224_121436 from './20241224_121436';
import * as migration_20241224_131704 from './20241224_131704';
import * as migration_20241224_141550 from './20241224_141550';
import * as migration_20241224_154327 from './20241224_154327';
import * as migration_20241224_154623 from './20241224_154623';
import * as migration_20241224_154839 from './20241224_154839';
import * as migration_20241224_212312 from './20241224_212312';

export const migrations = [
  {
    up: migration_20241223_103323_initial.up,
    down: migration_20241223_103323_initial.down,
    name: '20241223_103323_initial',
  },
  {
    up: migration_20241223_112215_move_owner_flags_to_venue.up,
    down: migration_20241223_112215_move_owner_flags_to_venue.down,
    name: '20241223_112215_move_owner_flags_to_venue',
  },
  {
    up: migration_20241223_122640_add_min_booking_hours_and_address_fields.up,
    down: migration_20241223_122640_add_min_booking_hours_and_address_fields.down,
    name: '20241223_122640_add_min_booking_hours_and_address_fields',
  },
  {
    up: migration_20241224_114547.up,
    down: migration_20241224_114547.down,
    name: '20241224_114547',
  },
  {
    up: migration_20241224_121436.up,
    down: migration_20241224_121436.down,
    name: '20241224_121436',
  },
  {
    up: migration_20241224_131704.up,
    down: migration_20241224_131704.down,
    name: '20241224_131704',
  },
  {
    up: migration_20241224_141550.up,
    down: migration_20241224_141550.down,
    name: '20241224_141550',
  },
  {
    up: migration_20241224_154327.up,
    down: migration_20241224_154327.down,
    name: '20241224_154327',
  },
  {
    up: migration_20241224_154623.up,
    down: migration_20241224_154623.down,
    name: '20241224_154623',
  },
  {
    up: migration_20241224_154839.up,
    down: migration_20241224_154839.down,
    name: '20241224_154839',
  },
  {
    up: migration_20241224_212312.up,
    down: migration_20241224_212312.down,
    name: '20241224_212312'
  },
];
