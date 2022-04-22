import React, { useEffect, useState } from 'react'
import styles from './FileTabs.module.css'

function FileTabsBarContainer({ children, initialTab }) {
    const [activeTab, setActiveTab] = useState(children[0].props.label)
    // const router = useRouter();

    const handleClick = (e, newActiveTab) => {
        e.preventDefault()
        setActiveTab(newActiveTab)
        //   setActiveTab(slugify(newActiveTab));
    }

    useEffect(() => {
        if (initialTab.tab) {
            setActiveTab(initialTab.tab)
        }
    }, [])

    return (
        <div>
            <ul className={styles.tabs}>
                {children.map((tab) => {
                    const label = tab.props.label
                    return (
                        <li
                            // className={
                            //     slugify(label) == activeTab
                            //         ? styles.current
                            //         : ''
                            // }
                            key={label}
                        >
                            <a href="#" onClick={(e) => handleClick(e, label)}>
                                {label}
                            </a>
                        </li>
                    )
                })}
            </ul>
            {children.map((one, index) => {
                // if (slugify(one.props.label) == activeTab)
                if (index === 0)
                    return (
                        <div key={one.props.label} className={styles.content}>
                            {one.props.children}
                        </div>
                    )
            })}
        </div>
    )
}
export default FileTabsBarContainer
