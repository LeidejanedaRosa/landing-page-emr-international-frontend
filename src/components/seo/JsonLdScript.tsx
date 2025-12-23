import React, { memo } from 'react'

interface JsonLdScriptProps {
  data: Record<string, unknown>
  prettyPrint?: boolean
}

/**
 * Componente genérico para renderizar JSON-LD structured data.
 *
 * @example
 * <JsonLdScript data={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'EMR' }} />
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export const JsonLdScript: React.FC<JsonLdScriptProps> = memo(
  ({ data, prettyPrint = false }) => {
    const jsonString = (
      prettyPrint ? JSON.stringify(data, null, 2) : JSON.stringify(data)
    ).replace(/<\/script>/gi, '<\\/script>')

    return (
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    )
  }
)

JsonLdScript.displayName = 'JsonLdScript'
