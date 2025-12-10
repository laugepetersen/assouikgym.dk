/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import TextAndMedia from './TextAndMedia/Component'
import RichTextBlock from './RichTextBlock/Component'
import Banner from './BannerBlock/Component'
import SliderBlock from './SliderBlock/Component'
import ClassesBlock from './Classes/Component'
import MembershipsBlock from './Memberships/Component'
import { MediaGridBlock } from './MediaGridBlock/Component'

type BlockComponentsType = {
  content: typeof ContentBlock
  formBlock: typeof FormBlock
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
  formBlock: FormBlock,
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
