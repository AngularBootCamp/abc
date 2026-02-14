import { FieldDef } from './schema-form-utils';

export const exampleSchema: FieldDef[] = [
  {
    fieldName: 'firstName',
    fieldLabel: 'First Name',
    fieldType: 'text',
    mandatory: true
  },

  {
    fieldName: 'lastName',
    fieldLabel: 'Last Name',
    fieldType: 'text',
    mandatory: true
  },

  {
    fieldName: 'dob',
    fieldLabel: 'Birthdate',
    fieldType: 'date'
  },

  {
    fieldName: 'zip',
    fieldLabel: 'Postal Code',
    fieldType: 'text',
    mandatory: true,
    matchesPattern: '\\d{5}'
  },

  {
    fieldName: 'password',
    fieldLabel: 'Password',
    fieldType: 'password',
    mandatory: true,
    minimumLength: 3,
    maximumLength: 10
  },

  {
    fieldName: 'notes',
    fieldLabel: 'Notes',
    fieldType: 'text',
    defaultValue: ''
  }
];
