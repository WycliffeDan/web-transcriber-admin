import { Record, RecordRelationship } from '@orbit/data';

export interface Section extends Record {
  attributes: {
    sequencenum: number;
    name: string;
    state: string;
    planId: number;
    transcriberId: number; //userid
    reviewerId: number; //userid
  };
  relationships?: {
    // project: RecordRelationship;
    plan: RecordRelationship;
    passages: RecordRelationship;
    transcriber: RecordRelationship;
    reviewer: RecordRelationship;
  };
}
export default Section;
