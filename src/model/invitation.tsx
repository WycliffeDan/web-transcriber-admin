import { Record, RecordRelationship } from '@orbit/data';

export interface Invitation extends Record {
  attributes: {
    email: string;
    silId: number;
    accepted: boolean;
    dateCreated: string;
    dateUpdated: string;
    lastModfiedBy: number;
  };
  relationships?: {
    organization: RecordRelationship;
    role: RecordRelationship;
  };
}
export default Invitation;
