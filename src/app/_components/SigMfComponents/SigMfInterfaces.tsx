export interface SigMfInputProps {
    label: string,
    id: string,
    changeFunction: Function,
    placeholder?: string,
    required?: boolean,
    hidden?: boolean
}

export interface SigMfGeoType {
    point: string,
    lat: number,
    lon: number,
    alt?: number
}

export interface SigMfCapDetsCapType {
    acqScaleFactor: number,
    attenuation: number,
    acqBw: number,
    startCap: string,
    stopCap: string,
    srcFile: string,
    gain?: number
}

export interface SigMfCapDetsAnnotType {
    snr: number,
    sigRefNum: number
}