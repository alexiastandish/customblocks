// import React, { useState, useEffect, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addNewBlock } from '../../thunks/add-new-block'
// import { filesSelector } from './filesSelectors'
// import { setActiveFile } from './filesSlice'

// function Files(props) {
//     const dispatch = useDispatch()
//     const activeFile = useSelector((state) => state.files.activeFile)

//     let files = useSelector(filesSelector)

//     // useEffect(() => {
//     //     if (!activeFile && files.length === 0) {
//     //         dispatch(addNewBlock())
//     //     }
//     // }, [dispatch, files, activeFile])
//     // console.log('files', files)
//     // console.log('activeFile', activeFile)
//     return (
//         <>
//             Active File: {activeFile?.id}
//             <div>
//                 {files.length &&
//                     Object.entries(files).map(([id, key]) => {
//                         return (
//                             <p
//                                 key={id}
//                                 onClick={() => dispatch(setActiveFile(id))}
//                             >
//                                 tab: {id}
//                             </p>
//                         )
//                     })}
//             </div>
//         </>
//     )
// }
// export default Files
