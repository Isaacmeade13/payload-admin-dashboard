import * as migration_20250113_091545_initial_migration from './20250113_091545_initial_migration';

export const migrations = [
  {
    up: migration_20250113_091545_initial_migration.up,
    down: migration_20250113_091545_initial_migration.down,
    name: '20250113_091545_initial_migration'
  },
];
