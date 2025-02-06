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
    'core:geolocation'?: SigMfGeoType|null,
    traceability?: SigMfTraceabilityGlobalType|null,
    antenna?: SigMfAntennaGlobalType|null
}

export interface SigMfCaptureType {
    'core:sample_start': number|null,
    'core:datetime'?: string|null,
    'core:frequency'?: number|null,
    'core:global_index'?: number|null,
    'core:header_bytes'?: number|null,
    'core:geolocation'?: SigMfGeoType|null,
    capture_details?: SigMfCapDetsCapType|null
}

export interface SigMfAnnotationType {
    'core:sample_start': number|null,
    'core:sample_count'?: number|null,
    'core:freq_lower_edge'?: number|null,
    'core:freq_upper_edge'?: number|null,
    'core:label'?: string|null,
    'core:comment'?: string|null,
    'core:generator'?: string|null,
    'core:uuid'?: string|null,
    capture_details?: SigMfCapDetsAnnotType|null,
    signal?: SigMfSignalType|null,
    traceability?: SigMfTraceabilityAnnotationType|null,
    antenna?: SigMfAntennaAnnotationType|null
}

export interface SigMfCapDetsCapType {
    enabled?: boolean,
    'capture_details:acq_scale_factor': number|null,
    'capture_details:attenuation': number|null,
    'capture_details:acquisition_bandwidth': number|null,
    'capture_details:start_capture': string|null,
    'capture_details:stop_capture': string|null,
    'capture_details:source_file': string|null,
    'capture_details:gain'?: number|null
}

export interface SigMfCapDetsAnnotType {
    enabled?: boolean,
    'capture_details:SNRdB'?: number|null,
    'capture_details:signal_reference_number'?: number|null
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

export interface SigMfSignalType {
    enabled?: boolean,
    'signal:detail'?: SigMfSignalDetailType,
    'signal:emitter'?: SigMfSignalEmitterType
}

export interface SigMfDataChangeType {
    enabled?: boolean,
    'author'?: string|null,
    'datetime': string|null
}

export interface SigMfOriginType {
    enabled?: boolean,
    'account'?: string|null,
    'container'?: string|null,
    'file_path': string|null
}

export interface SigMfTraceabilityGlobalType {
    enabled?: boolean,
    'traceability:last_modified'?: SigMfDataChangeType|null,
    'traceability:last_reviewed'?: SigMfDataChangeType|null,
    'traceability:revision'?: number|null,
    'traceability:origin'?: SigMfOriginType
}

export interface SigMfTraceabilityAnnotationType {
    enabled?: boolean,
    'traceability:last_modified'?: SigMfDataChangeType|null,
    'traceability:last_reviewed'?: SigMfDataChangeType|null
}

export interface SigMfAntennaGlobalType {
    enabled?: boolean,
    'antenna:model': string|null,
    'antenna:type'?: string|null,
    'antenna:low_frequency'?: number|null,
    'antenna:high_frequency'?: number|null,
    'antenna:gain'?: number|null,
    'antenna:horizontal_gain_pattern'?: number[]|null,
    'antenna:vertical_gain_pattern'?: number[]|null,
    'antenna:horizontal_beam_width'?: number|null,
    'antenna:vertical_beam_width'?: number|null,
    'antenna:cross_polar_discrimination'?: number|null,
    'antenna:voltage_standing_wave_ratio'?: number|null,
    'antenna:cable_loss'?: number|null,
    'antenna:steerable'?: boolean|null,
    'antenna:mobile'?: boolean|null,
    'antenna:hagl'?: number|null
}

export interface SigMfAntennaAnnotationType {
    enabled?: boolean,
    'antenna:azimuth_angle'?: number|null,
    'antenna:elevation_angle'?: number|null,
    'antenna:polarization'?: string|null
}