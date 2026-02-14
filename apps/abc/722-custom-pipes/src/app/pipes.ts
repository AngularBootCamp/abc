import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkmark'
})
export class CheckmarkPipe implements PipeTransform {
  transform(input: unknown) {
    const checkMark = '\u2713';
    const xMark = '\u2718';
    return input ? checkMark : xMark;
  }
}

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {
  transform(input: string) {
    return (
      input.slice(0, 1).toUpperCase() + input.toLowerCase().slice(1)
    );
  }
}

@Pipe({
  name: 'containsX'
})
export class ContainsXPipe implements PipeTransform {
  transform(collection: string[], searchTerm: string) {
    if (collection?.filter) {
      return collection.filter(v => v.indexOf(searchTerm) > -1);
    }
    return collection;
  }
}

@Pipe({
  name: 'fieldRange'
})
export class FieldRangePipe implements PipeTransform {
  transform<T, F extends keyof T>(
    input: T[],
    fieldName: F,
    lower: T[F],
    upper: T[F]
  ) {
    return input.filter(
      v => v[fieldName] >= lower && v[fieldName] <= upper
    );
  }
}

@Pipe({
  name: 'defaultToString'
})
export class DefaultToStringPipe implements PipeTransform {
  transform(input: string | null | undefined) {
    return input ?? '';
  }
}
