/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import type { Page } from '@/payload-types'
import React, { Fragment } from 'react'
import Banner from './BannerBlock/Component'
import ClassesBlock from './Classes/Component'
import { MediaGridBlock } from './MediaGridBlock/Component'
import MembershipsBlock from './Memberships/Component'
import RichTextBlock from './RichTextBlock/Component'
import SliderBlock from './SliderBlock/Component'
import TextAndMedia from './TextAndMedia/Component'

type BlockComponentsType = {
  content: typeof ContentBlock
  mediaBlock: typeof MediaBlock
  textAndMedia: typeof TextAndMedia
  richTextBlock: typeof RichTextBlock
  banner: typeof Banner
  membershipsBlock: typeof MembershipsBlock
  sliderBlock: typeof SliderBlock
  classesBlock: typeof ClassesBlock
  mediaGridBlock: typeof MediaGridBlock
}

const blockComponents: BlockComponentsType = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  textAndMedia: TextAndMedia,
  richTextBlock: RichTextBlock,
  banner: Banner,
  membershipsBlock: MembershipsBlock,
  sliderBlock: SliderBlock,
  classesBlock: ClassesBlock,
  mediaGridBlock: MediaGridBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof BlockComponentsType]
          return (
            <div key={index}>
              <Block {...(block as any)} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
