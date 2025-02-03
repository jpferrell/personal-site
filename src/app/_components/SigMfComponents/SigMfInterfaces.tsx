import { SetStateAction } from "react"
import { Dispatch } from "react"

export interface SigMfInputProps {
    label: string,
    id: string,
    changeFunction: Function,
    placeholder?: string,
    required?: boolean,
    hidden?: boolean
}

export interface SigMfGeoType {
    enabled: boolean,
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

export interface SigMfAnnotationType {
    sampStart: number|null,
    sampCnt: number|null,
    freqLowEdge: number|null,
    freqHighEdge: number|null,
    label: string|null,
    comment: string|null,
    generator: string|null,
    uuid: string|null,
    geo: SigMfGeoType|null,
    capDets: SigMfCapDetsAnnotType|null
}

export interface SigMfCapDetsCapType {
    enabled: boolean,
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