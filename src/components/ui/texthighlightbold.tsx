import React from 'react'

interface TextHighlightProps {
  text: string
}

const TextHighlight: React.FC<TextHighlightProps> = ({ text }) => {
  const parts = text.split(/\|(.*?)\|/g).filter(Boolean)

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 !== 1) {
          return (
            <span key={index} className="font-medium" dangerouslySetInnerHTML={{ __html: part }} />
          )
        } else {
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
        }
      })}
    </>
  )
}

export default TextHighlight
