export interface SigMfInputProps {
    label: string,
    id: string,
    changeFunction: Function,
    placeholder?: string,
    required?: boolean,
    hidden?: boolean
}

export interface SigMfGeoType {
    type: string|null,
    lat: number|null,
    lon: number|null,
    alt?: number|null
}

export interface SigMfCaptureType {
    sampStart: number|null,
    datetime: string|null,
    freq: number|null,
    globalIdx: number|null,
    headerBytes: number|null,
    capDets: SigMfCapDetsCapType|null
}

export interface SigMfCapDetsCapType {
    acqScaleFactor: number|null,
    attenuation: number|null,
    acqBw: number|null,
    startCap: string|null,
    stopCap: string|null,
    srcFile: string|null,
    gain?: number|null
}

export interface SigMfCapDetsAnnotType {
    enabled: boolean,
    snr: number|null,
    sigRefNum: number|null
}