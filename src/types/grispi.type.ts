export interface Settings extends Record<string, any> {}

interface Role {
  authority: string;
  impliedAuthorities: string[];
  teamUser: boolean;
}

interface User {
  role: Role;
  groups: any[];
  id: number;
  email: string;
  emails: any[];
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  phones: any[];
  organization: any;
  language: any;
  tags: any[];
  enabled: boolean;
  profilePicture: string;
  createdAt: number;
  updatedAt: number;
  fields: any[];
}

interface Attachment {
  id: number;
  filename: string;
  objectKey: string;
  objectThumbKey: string;
  bucket: string;
  mimeType: string;
  size: number;
  userId: number;
  objectThumbUrl: string;
  objectUrl: string;
}

interface Comment {
  attachments: Attachment[];
  id: number;
  body: string;
  publicVisible: boolean;
  ticketKey: string;
  createdAt: number;
  creator: User;
  call: any;
  toId: any;
  toEmail: any;
  commentCCs: any[];
  mentionedUsers: any[];
  channel: string;
  externalId: string;
}

interface Group {
  id: number;
  name: string;
}

interface FieldMap {
  id: any;
  value: any;
  serializedValue: string | null;
  userFriendlyValue: string;
  type: string;
  key: string;
}

export interface Field {
  key: string;
  conditions: any[];
  required: {
    type: string;
    ids: any[];
  };
}

interface Form {
  id: number;
  name: string;
  description: string;
  permission: string;
  consent: any;
  enabled: boolean;
  endUserForm: boolean;
  fields: Field[];
}

export interface Ticket {
  key: string;
  callMergeStatus: any;
  channel: string;
  form: Form;
  createdAt: number;
  updatedAt: number;
  solvedAt: any;
  comments: Comment[];
  fieldMap: {
    [key: string]: FieldMap;
  };
  relation: any[];
  resolution: any;
}

interface Agent {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

interface Requester {
  id: number;
  fullName: string;
  email: any;
  phone: any;
}

interface Context {
  username: string;
  tenantId: string;
  ticketKey: string;
  ticket: Ticket;
  agent: Agent;
  requester: Requester;
  token: string;
}

export interface GrispiBundle {
  settings: Settings;
  context: Context;
}
