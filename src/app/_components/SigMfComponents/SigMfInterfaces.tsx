export interface SigMfInputProps {
    label: string,
    id: string,
    changeFunction: Function,
    placeholder?: string,
    required?: boolean,
    hidden?: boolean
}

export interface SigMfSelectInputProps extends SigMfInputProps {
    values: string[]
}

export interface SigMfGeoType {
    enabled: boolean,
    type: string|null,
    lat: number|null,
    lon: number|null,
    alt?: number|null
}

export interface SigMfGlobalType {
    'core:datatype': string|null,
    'core:sample_rate'?: number| null,
    'core:author'?: string|null,
    'core:collection'?: string|null,
    'core:dataset'?: string|null,
    'core:data_doi'?: string|null,
    'core:description'?: string|null,
    'core:hw'?: string|null,
    'core:license'?: string|null,
    'core:metadata_only'?: boolean|null,
    'core:meta_doi'?: string|null,
    'core:num_channels'?: number|null,
    'core:offset'?: number|null,
    'core:recorder'?: string|null,
    'core:sha512'?: string|null,
    'core:trailing_bytes'?: number|null,
    'core:version': string|null,
    'core:geolocation'?: SigMfGeoType|null
}

export interface SigMfCaptureType {
    'core:sample_start': number|null,
    'core:datetime': string|null,
    'core:frequency': number|null,
    'core:global_index': number|null,
    'core:header_bytes': number|null,
    'core:geolocation': SigMfGeoType|null,
    capture_details: SigMfCapDetsCapType|null
}

export interface SigMfAnnotationType {
    'core:sample_start': number|null,
    'core:sample_count': number|null,
    'core:freq_lower_edge': number|null,
    'core:freq_upper_edge': number|null,
    'core:label': string|null,
    'core:comment': string|null,
    'core:generator': string|null,
    'core:uuid': string|null,
    capture_details: SigMfCapDetsAnnotType|null
}

export interface SigMfCapDetsCapType {
    enabled: boolean,
    'capture_details:acq_scale_factor': number|null,
    'capture_details:attenuation': number|null,
    'capture_details:acquisition_bandwidth': number|null,
    'capture_details:start_capture': string|null,
    'capture_details:stop_capture': string|null,
    'capture_details:source_file': string|null,
    'capture_details:gain'?: number|null
}

export interface SigMfCapDetsAnnotType {
    enabled: boolean,
    'capture_details:SNRdB': number|null,
    'capture_details:signal_reference_number': number|null
}

export interface SigMfCapComponent {
    component: Element,
    data: SigMfCaptureType
}

export interface SigMfSignalDetailType {
    type?: string|null,
    mod_class?: string|null,
    standard?: string|null,
    carrier_variant?: string|null,
    symbol_variant?: string|null,
    order?: number|null,
    duplexing?: string|null,
    multiplexing?: string|null,
    multiple_access?: string|null,
    spreading?: string|null,
    channel_bw?: number|null,
    channel?: number|null,
    class_variant?: string|null
}

export interface SigMfSignalEmitterType {
    seid?: number|null,
    manufacturer?: string|null,
    power_tx?: number|null,
    power_eirp?: number|null,
    geolocation?: SigMfGeoType|null
}