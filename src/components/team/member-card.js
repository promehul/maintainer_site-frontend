import React from 'react'
import { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { memberImageStyle } from '../../consts'
import { urlStaticBase } from '../../urls'

import styles from '../../css/team/member-card.css'

const MemberCard = ({ info, roleOptions, designationOptions, linkOptions, member }) => {

    const [flipped, setFlipped] = useState(false)

    return (
        <div styleName="styles.card"
            onMouseLeave={() => { setFlipped(false) }}
            onMouseEnter={() => { setFlipped(true) }}
        >
            <div styleName={flipped ? "styles.flippedCard" : ""}>
                <Link to={"../" + member + "/" + info.informalHandle}>
                    <div style={memberImageStyle(info.childhoodImage, '25.9rem')} styleName="styles.informal">
                        <div styleName="styles.roleSVG">
                            {roleOptions.map(
                                role =>
                                    info.maintainer.role === role.value && (
                                        <React.Fragment key={role.displayName}>
                                            {role.displayName === 'Developer' ? (
                                                <Image src={`${urlStaticBase()}developer.svg`} alt="Developer" />
                                            ) : (
                                                <Image src={`${urlStaticBase()}designer.svg`} alt="Designer" />
                                            )}
                                        </React.Fragment>
                                    )
                            )}
                        </div>
                        <div styleName="styles.memberProfile">
                            <div styleName="styles.text-break styles.name" >
                                {info.maintainer.person.fullName}
                            </div>
                            <div>
                                {designationOptions.map(
                                    designation =>
                                        info.maintainer.designation === designation.value && (
                                            <div key={designation.displayName} styleName="styles.designation">
                                                {designation.displayName}
                                            </div>))}
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to={"../" + member + "/" + info.informalHandle}>
                    <div styleName="styles.formal">
                        <div>
                            <div styleName="styles.roleSVG">
                                {roleOptions.map(
                                    role =>
                                        info.maintainer.role === role.value && (
                                            <React.Fragment key={role.displayName}>
                                                {role.displayName === 'Developer' ? (
                                                    <Image src={`${urlStaticBase()}developer.svg`} alt="Developer" />
                                                ) : (
                                                    <Image src={`${urlStaticBase()}designer.svg`} alt="Designer" />
                                                )}
                                            </React.Fragment>
                                        )
                                )}
                            </div>
                            <div styleName="styles.memberProfile">
                                <div styleName="styles.text-break styles.name" >
                                    {info.maintainer.person.fullName}
                                </div>
                                <div>
                                    {designationOptions.map(
                                        designation =>
                                            info.maintainer.designation === designation.value && (
                                                <div key={designation.displayName} styleName="styles.designation">
                                                    {designation.displayName}
                                                </div>))}
                                </div>
                            </div>
                        </div>
                        <div style={memberImageStyle(info.formalImage, '25.9rem')} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MemberCard
