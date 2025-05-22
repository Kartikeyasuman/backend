const { EntitySchema } = require('typeorm');

module.exports.Software = new EntitySchema({
  name: 'Software',
  tableName: 'softwares',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    name: { type: 'varchar' },
    description: { type: 'text' },
    accessLevels: { type: 'simple-array' }
  }
});
