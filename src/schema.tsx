import { KeyMap, Schema, SchemaSettings } from '@orbit/data';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import { number, string } from 'prop-types';

export const keyMap = new KeyMap();

const schemaDefinition: SchemaSettings =  {
  models: {
    book: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        bookTypeId: { type: 'number' },
      },
      relationships: {
        type: { type: 'hasOne', model: 'booktype', inverse: 'books' },
        sets: { type: 'hasMany', model: 'set', inverse: 'book' },
      },
    },
    booktype: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      relationships: {
        books: { type: 'hasMany', model: 'book', inverse: 'type' },
      },
    },
    group: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        organizationId: { type: 'number' },
      },
      relationships: {
        organization: { type: 'hasOne', model: 'organization', inverse: 'groups' },
        users: { type: 'hasMany', model: 'user', inverse: 'groups' },
      },
    },
    integration: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        url: { type: 'string' },
      },
      relationships: {
        projectIntegrations: { type: 'hasMany', model: 'projectintegration', inverse: 'project' },
      },
    },
    organization: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        websiteUrl: { type: 'string' },
        logoUrl: { type: 'string' },
        publicByDefault: { type: 'boolean' },
      },
      relationships: {
        owner: { type: 'hasOne', model: 'user', inverse: 'ownedOrganizations' },
        users: { type: 'hasMany', model: 'user', inverse: 'organizations' },
        groups: { type: 'hasMany', model: 'group', inverse: 'organization' },
      }
    },
    organizationmemberships: {
      keys: { remoteId: {} },
      attributes: {
        email: { type: 'string' },
        userId: { type: 'number' },
        organizationId: { type: 'number' },
      },
      relationships: {
        user: { type: 'hasOne', model: 'user' },
        organization: { type: 'hasOne', model: 'organization' },
      }
    },
    project: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        projectTypeId: { type: 'number' },
        description: { type: 'string' },
        ownerId: { type: 'number' },
        organizationId: { type: 'number' },
        groupId: { type: 'number' },
        uilanguagebcp47: { type: 'string' },
        language: { type: 'string' },
        languageName: { type: 'string' },
        defaultFont: { type: 'string' },
        defaultFontSize: { type: 'string' },
        rtl: { type: 'boolean' },
        allowClaim: { type: 'boolean' },
        isPublic: { type: 'boolean' },
        dateCreated: { type: 'date' },
        dateUpdated: { type: 'date' },
        dateArchived: { type: 'date' },
      },
      relationships: {
        type: { type: 'hasOne', model: 'projecttype', inverse: 'projects' },
        owner: { type: 'hasOne', model: 'user', inverse: 'projects' },
        organization: { type: 'hasOne', model: 'organization'},
        group: { type: 'hasOne', model: 'group' },
        projectIntegrations: { type: 'hasMany', model: 'projectintegration', inverse: 'project' },
        users: { type: 'hasMany', model: 'usertask', inverse: 'project' },
        sets: { type: 'hasMany', model: 'set', inverse: 'project' },
      }
    },
    projectintegration: {
      keys: { remoteId: {} },
      attributes: {
        projectId: { type: 'number' },
        integrationId: { type: 'number' },
        settings: { type: 'string' },
      },
      relationships: {
        integration: { type: 'hasOne', model: 'integration', inverse: 'projectIntegrations' },
        project: { type: 'hasOne', model: 'project', inverse: 'projectIntegrations' },
      },
    },
    projecttype: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      relationships: {
        projects: { type: 'hasMany', model: 'project', inverse: 'type' },
      },
    },
    projectusers: {
      keys: { remoteId: {} },
      attributes: {
        userId: { type: 'number' },
        projectId: { type: 'number' },
        roleId: { type: 'number' },
        font:  { type: 'string' },
        fontSize: { type: 'string' },
      },
      relationships: {
        user: { type: 'hasOne', model: 'user' },
        project: { type: 'hasOne', model: 'project' },
        role: { type: 'hasOne', model: 'role' },
      },
    },
    role: {
      keys: { remoteId: {} },
      attributes: {
        roleName: { type: 'string' },
        organizationId: { type: 'number' },
      },
      relationships: {
        organization: { type: 'hasOne', model: 'organization' },
        users: { type: 'hasMany', model: 'userrole', inverse: 'role' },
      },
    },
    set: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        bookId: { type: 'number' },
      },
      relationships: {
        projects: { type: 'hasMany', model: 'project', inverse: 'sets' },
        book: { type: 'hasOne', model: 'book', inverse: 'sets' },
        tasks: { type: 'hasMany', model: 'task', inverse: 'sets' },
      },
    },
    task: {
      keys: { remoteId: {} },
      attributes: {
        reference: { type: 'string' },
        passage: { type: 'string' },
        position: { type: 'number' },
        taskstate: { type: 'string' },
        hold: { type: 'boolean' },
        title: { type: 'string' },
        datecreated: { type: 'date' },
        dateupdated: { type: 'date' },
      },
      relationships: {
        media: { type: 'hasMany', model: 'taskmedia', inverse: 'task' },
        sets: { type: 'hasMany', model: 'set', inverse: 'tasks' },
      },
    },
    tasksets: {
      keys: { remoteId: {} },
      attributes: {
        taskId: { type: 'number' },
        setId: { type: 'number' },
      },
      relationships: {
        task: { type: 'hasOne', model: 'task' },
        set: { type: 'hasOne', model: 'set' },
      },
    },
    taskmedia: {
      keys: { remoteId: {} },
      attributes: {
        versionnumber: { type: 'number' },
        artifacttype: { type: 'string' },
        eafurl: { type: 'string' },
        audiourl: { type: 'string' },
        duration: { type: 'number' },
        contenttype: { type: 'string' },
        audioquality: { type: 'string' },
        textquality: { type: 'string' },
        transcription: { type: 'string' },
        datecreated: { type: 'date' },
        dateupdated: { type: 'date' },
      },
      relationships: {
        task: { type: 'hasOne', model: 'taskmedia', inverse: 'media' },
      },
    },
    user: {
      keys: { remoteId: {} },
      attributes: {
        name: { type: 'string' },
        givenName: { type: 'string' },
        familyName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        timezone: { type: 'string' },
        locale: { type: 'string' },
        isLocked: { type: 'boolean' },
        auth0Id: { type: 'string' },
        dateCreated: { type: 'date' },
        dateUpdated: { type: 'date' },
      },
      relationships: {
        ownedOrganizations: { type: 'hasMany', model: 'organization', inverse: 'owner' },
        projects: { type: 'hasMany', model: 'project', inverse: 'owner' },
        organizationMemberships: { type: 'hasMany', model: 'organization', inverse: 'users' },
        roles: { type: 'hasMany', model: 'userrole', inverse: 'user' },
        groups: { type: 'hasMany', model: 'group', inverse: 'users' },
      },
    },
    userrole: {
      keys: { remoteId: {} },
      attributes: {
        userId: { type: 'number' },
        roleId: { type: 'number' },
        organizationId: { type: 'number' },
      },
      relationships: {
        user: { type: 'hasOne', model: 'user', inverse: 'roles' },
        role: { type: 'hasOne', model: 'role', inverse: 'userroles' },
        organization: { type: 'hasOne', model: 'organization', inverse: 'userroles' },
      },
    },
    usertask: {
      keys: { remoteId: {} },
      attributes: {
        activityname: { type: 'string' },
        taskstate: { type: 'string' },
        comment: { type: 'string' },
        datecreated: { type: 'date' },
        dateupdated: { type: 'date' },
      },
      relationships: {
        project: { type: 'hasOne', model: 'project', inverse: 'users' },
        assigned: { type: 'hasOne', model: 'user', inverse: 'assignedTasks' },
      },
    },
  }
};

export const schema = new Schema(schemaDefinition);