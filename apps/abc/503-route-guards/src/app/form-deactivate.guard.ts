export interface FormDeactivateCheck {
  hasUnsavedChanges: () => boolean;
}

export function FormDeactivateGuard(component: FormDeactivateCheck) {
  if (component.hasUnsavedChanges()) {
    // In a real app, we'd probably use a platform-specific
    // dialog service, but `window.confirm` works for a demo.
    //
    return window.confirm(
      'There are unsaved changes! Are you sure you want to leave?'
    );
  }

  return true;
}
