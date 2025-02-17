import { Record, RecordRelationship } from '@orbit/data';

export interface Group extends Record {
  attributes: {
    name: string;
    abbreviation: string;
    ownerId: number;
  };
  relationships?: {
    owner: RecordRelationship;
    projects: RecordRelationship;
    groupMemberships: RecordRelationship;
  };
}
export default Group;
