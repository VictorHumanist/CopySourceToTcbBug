# Angular Language Service - CopySourceToTcb import collision

Minimal reproduction for false template diagnostics produced by the Angular Language Service in <code>CopySourceToTcb</code> mode.

## Versions

- Angular packages: 22.2.3
- Angular Language Service VS Code extension: 22.2.0
- TypeScript: 6.0.3

## Reproduce

1. Run <code>npm install</code>.
2. Run <code>npm run build</code>; the Angular CLI build succeeds.
3. Open this folder by itself in VS Code with Angular Language Service 22.2.0 enabled.
4. Open <code>src/app/copy-source-to-tcb-repro.component.html</code>.
5. Observe false <code>ngtsc(2339)</code> and <code>ngtsc(7053)</code> errors on the signal-input bindings. If errors don't show up immediately, edit the file, e.g. add empty line.
6. Put the cursor in <code>busy()</code> and run **Angular: View Template Typecheck Block**.

The generated TCB copies the generic component source and produces colliding namespace imports similar to:

~~~ts
import * as i0 from '@fundamental-ngx/ui5-webcomponents/utils'
// ...
import * as i0 from '@angular/core';
~~~

The first import is needed for the <code>GenericControlValueAccessor</code> host directive on <code>MultiComboBox</code>. The second is the preparation import for signal-input checking. As a result, <code>i0.ɵINPUT_SIGNAL_BRAND_WRITE_TYPE</code> can be resolved against the Fundamental NGX utility module instead of <code>@angular/core</code>.

The trigger consists of:

- a generic component with a non-exported generic constraint, forcing copied-source inline type checking;
- an external component with a host directive, forcing a generated external import; and
- transformed signal inputs, forcing the Angular-core signal write-brand import.

