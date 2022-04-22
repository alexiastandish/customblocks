import { createEntityAdapter } from '@reduxjs/toolkit'

const blocksAdapter = createEntityAdapter({
    selectId: (block) => block.id,
})

export default blocksAdapter
