import 'reactn';
import Memory from '@orbit/memory';
import { Schema, KeyMap } from '@orbit/data';
import { Bucket } from '@orbit/core';
import JSONAPISource from '@orbit/jsonapi';

declare module 'reactn/default' {
  export interface State {
    organization: string;
    project: string;
    plan: string;
    tab: number;
    group: string;
    user: string;
    lang: string;
    memory: Memory;
    schema: Schema;
    keyMap: KeyMap;
    bucket: Bucket;
    remote: JSONAPISource;
  }
}
