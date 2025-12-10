import React from 'react'

interface BreakTextProps {
  text: string
}

const BreakText: React.FC<BreakTextProps> = ({ text }) => {
  const segments = text.split('<br />')

  return (
    <>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: segment }} />
          {index < segments.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  )
}

export default BreakText
