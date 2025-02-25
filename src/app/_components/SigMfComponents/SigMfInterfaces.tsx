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
    type: string,
    lat: number|string,
    lon: number|string,
    alt?: number|string
}

export interface SigMfExtensionsType {
    name: string,
    version: string,
    optional: boolean
}

export interface SigMfGlobalType {
    'core:datatype': string,
    'core:sample_rate'?: number| string,
    'core:author'?: string,
    'core:collection'?: string,
    'core:dataset'?: string,
    'core:data_doi'?: string,
    'core:description'?: string,
    'core:hw'?: string,
    'core:license'?: string,
    'core:metadata_only'?: boolean,
    'core:meta_doi'?: string,
    'core:num_channels'?: number|string,
    'core:offset'?: number|string,
    'core:recorder'?: string,
    'core:sha512'?: string,
    'core:trailing_bytes'?: number|string,
    'core:version': string,
    'core:geolocation'?: SigMfGeoType|object,
    'core:extensions'?: SigMfExtensionsType|object,
    traceability?: SigMfTraceabilityGlobalType|object,
    antenna?: SigMfAntennaGlobalType|object,
    spatial?: SigMfSpatialGlobalType|object
}

export interface SigMfCaptureType {
    'core:sample_start': number|string,
    'core:datetime'?: string,
    'core:frequency'?: number|string,
    'core:global_index'?: number|string,
    'core:header_bytes'?: number|string,
    'core:geolocation'?: SigMfGeoType|object,
    capture_details?: SigMfCapDetsCapType|object,
    spatial?: SigMfSpatialCaptureType|object
}

export interface SigMfAnnotationType {
    'core:sample_start': number|string,
    'core:sample_count'?: number|string,
    'core:freq_lower_edge'?: number|string,
    'core:freq_upper_edge'?: number|string,
    'core:label'?: string,
    'core:comment'?: string,
    'core:generator'?: string,
    'core:uuid'?: string,
    capture_details?: SigMfCapDetsAnnotType|object,
    signal?: SigMfSignalType|object,
    traceability?: SigMfTraceabilityAnnotationType|object,
    antenna?: SigMfAntennaAnnotationType|object
    spatial?: SigMfSpatialAnnotationType|object
}

export interface SigMfCapDetsCapType {
    enabled?: boolean,
    'capture_details:acq_scale_factor': number|string,
    'capture_details:attenuation': number|string,
    'capture_details:acquisition_bandwidth': number|string,
    'capture_details:start_capture': string|string,
    'capture_details:stop_capture': string|string,
    'capture_details:source_file': string|string,
    'capture_details:gain'?: number|string
}

export interface SigMfCapDetsAnnotType {
    enabled?: boolean,
    'capture_details:SNRdB': number|string,
    'capture_details:signal_reference_number': number|string
}

export interface SigMfCapComponent {
    component: Element,
    data: SigMfCaptureType
}

export interface SigMfSignalDetailType {
    type?: string,
    mod_class?: string,
    standard?: string,
    carrier_variant?: string,
    symbol_variant?: string,
    order?: number|string,
    duplexing?: string,
    multiplexing?: string,
    multiple_access?: string,
    spreading?: string,
    channel_bw?: number|string,
    channel?: number|string,
    class_variant?: string
}

export interface SigMfSignalEmitterType {
    seid?: number|string,
    manufacturer?: string,
    power_tx?: number|string,
    power_eirp?: number|string,
    geolocation?: SigMfGeoType|string
}

export interface SigMfSignalType {
    enabled?: boolean,
    'signal:detail'?: SigMfSignalDetailType,
    'signal:emitter'?: SigMfSignalEmitterType
}

export interface SigMfDataChangeType {
    enabled?: boolean,
    'author'?: string,
    'datetime': string
}

export interface SigMfOriginType {
    enabled?: boolean,
    'account'?: string|null,
    'container'?: string|null,
    'file_path': string|null
}

export interface SigMfTraceabilityGlobalType {
    enabled?: boolean,
    'traceability:last_modified'?: SigMfDataChangeType|string,
    'traceability:last_reviewed'?: SigMfDataChangeType|string,
    'traceability:revision'?: number|string,
    'traceability:origin'?: SigMfOriginType|string
}

export interface SigMfTraceabilityAnnotationType {
    enabled?: boolean,
    'traceability:last_modified'?: SigMfDataChangeType|string,
    'traceability:last_reviewed'?: SigMfDataChangeType|string
}

export interface SigMfAntennaGlobalType {
    enabled?: boolean,
    'antenna:model': string,
    'antenna:type'?: string,
    'antenna:low_frequency'?: number|string,
    'antenna:high_frequency'?: number|string,
    'antenna:gain'?: number|string,
    'antenna:horizontal_gain_pattern'?: number[],
    'antenna:vertical_gain_pattern'?: number[],
    'antenna:horizontal_beam_width'?: number|string,
    'antenna:vertical_beam_width'?: number|string,
    'antenna:cross_polar_discrimination'?: number|string,
    'antenna:voltage_standing_wave_ratio'?: number|string,
    'antenna:cable_loss'?: number|string,
    'antenna:steerable'?: boolean,
    'antenna:mobile'?: boolean,
    'antenna:hagl'?: number|string
}

export interface SigMfAntennaAnnotationType {
    enabled?: boolean,
    'antenna:azimuth_angle'?: number|string,
    'antenna:elevation_angle'?: number|string,
    'antenna:polarization'?: string|string
}

export interface SigMfBearingType {
    enabled?: boolean,
    azimuth?: number|string,
    elevation?: number|string,
    range?: number|string,
    range_rate?: number|string,
    az_error?: number|string,
    el_error?: number|string,
    range_error?: number|string,
    range_rate_error?: number|string
}

export interface SigMfCartesianPointType {
    enabled?: boolean,
    point?: number[]|null,
    unknown?: boolean
}

export interface SigMfSpatialGlobalType {
    enabled?: boolean,
    'spatial:num_elements': number|string,
    'spatial:channel_index': number|string
}

export interface SigMfCalibrationType {
    enabled?: boolean,
    caltype: string,
    bearing?: SigMfBearingType|string,
    cal_geometry?: SigMfCartesianPointType|string
}

export interface SigMfSpatialCaptureType {
    enabled?: boolean,
    'spatial:aperture_azimuth'?: number|string,
    'spatial:aperture_bearing'?: SigMfBearingType|string,
    'spatial:aperture_rotation'?: number|string,
    'spatial:emitter_bearing'?: SigMfBearingType|string,
    'spatial:element_geometry'?: SigMfCartesianPointType[]|string,
    'spatial:phase_offset'?: number|string,
    'spatial:calibration'?: SigMfCalibrationType|string
}

export interface SigMfSpatialAnnotationType {
    enabled?: boolean,
    'spatial:signal_azimuth'?: number|string,
    'spatial:bearing'?: SigMfBearingType|string,
    'spatial:emitter_location'?: SigMfGeoType|string
}

