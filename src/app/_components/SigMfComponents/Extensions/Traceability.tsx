

export function TraceabilityGlobal( { idPart, isHidden, changeFunction }: { idPart: string, isHidden: boolean, changeFunction: Function}) {
    return (
        <div id="traceability-global-container" hidden={isHidden}>

        </div>
    );
}

export function TraceabilityAnnotation() {
    return (
        <div id="traceability-annot-container">
            
        </div>
    );
}