import { ValidatorFn, Validators } from '@angular/forms';

type Value = string | number | Date;

export interface FieldDef {
  defaultValue?: Value;
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  mandatory?: boolean;
  matchesPattern?: string;
  maximumLength?: number;
  minimumLength?: number;
}

export class SchemaFormUtils {
  // Given a schema, return an array of control configurations suitable
  // for use with the FormBuilder group() method.

  static createControlsConfigFromSchema(schema: FieldDef[]) {
    const allControlConfigs: Record<
      string,
      [Value] | [Value, ValidatorFn[]]
    > = {};

    schema.forEach(fieldinfo => {
      const singleControlValidators: ValidatorFn[] = [];

      const defaultValue = fieldinfo.defaultValue || '';

      if (fieldinfo.mandatory) {
        singleControlValidators.push(Validators.required);
      }

      if (fieldinfo.minimumLength) {
        singleControlValidators.push(
          Validators.minLength(fieldinfo.minimumLength)
        );
      }

      if (fieldinfo.maximumLength) {
        singleControlValidators.push(
          Validators.maxLength(fieldinfo.maximumLength)
        );
      }

      if (fieldinfo.matchesPattern) {
        singleControlValidators.push(
          Validators.pattern(fieldinfo.matchesPattern)
        );
      }

      // If any validators were added, attach them to
      // the control configuration.
      //
      let singleControlConfig: [Value] | [Value, ValidatorFn[]];
      if (singleControlValidators.length > 0) {
        singleControlConfig = [defaultValue, singleControlValidators];
      } else {
        singleControlConfig = [defaultValue];
      }

      allControlConfigs[fieldinfo.fieldName] = singleControlConfig;
    });

    return allControlConfigs;
  }
}
