/**
 * Video field
 */
export const FIELD_VIDEO = (field = 'video') => `
    ${field} {
        sources[] {
            url,
            format,
        },
        "width": dimensions.width,
        "height": dimensions.height,
        "poster": poster.asset->url
    }
`

/**
 * Image field (with subfields)
 */
export const FIELD_IMAGE = (field = 'image', name = `image.image`) => `
    "${field}": {
        ${SUBFIELDS_IMAGE(name)},
    }
`

/**
 * SEO field
 */
export const FIELD_SEO = `
    seo {
        title,
        description,
        "image": image.asset->url,
    }
`


/**
 * Image subfields
 */
export const SUBFIELDS_IMAGE = (name: string) => `
    "url": ${name}.asset->url,
    "alt": ${name}.alt,
    "width": ${name}.asset->metadata.dimensions.width,
    "ratio": ${name}.asset->metadata.dimensions.aspectRatio
`


/**
 * Tracks subfields
 */
export const SUBFIELDS_TRACKS = `
    ${FIELD_IMAGE('image', 'cover')},
    title,
    "slug": slug.current,
    artist,
    duration,
    link,
    text,
    hasLicensing
`
