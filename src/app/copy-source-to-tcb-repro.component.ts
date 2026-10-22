import { Component, input } from "@angular/core";

import { BusyIndicator } from "@fundamental-ngx/ui5-webcomponents/busy-indicator";
import { MultiComboBox } from "@fundamental-ngx/ui5-webcomponents/multi-combo-box";

interface InternalConstraint {
    readonly key: PropertyKey;
}

@Component({
    selector: "app-copy-source-to-tcb-repro",
    imports: [BusyIndicator, MultiComboBox],
    templateUrl: "./copy-source-to-tcb-repro.component.html",
})
export class CopySourceToTcbReproComponent<TValue extends InternalConstraint> {
    readonly busy = input(false);
    readonly disabled = input(false);
    readonly showSelectAll = input(false);
}

