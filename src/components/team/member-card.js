import React from 'react'
import { useState } from 'react'
import { Image } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { backgroundImageStyle } from '../../consts'
import { memberImageStyle } from '../../consts'
import { urlStaticBase } from '../../urls'

import styles from '../../css/team/member.css'

const MemberCard = ({ info, roleOptions, designationOptions, linkOptions }) => {

    const [flipped, setFlipped] = useState(false)
    const [profile, setProfile] = useState(info.formalImage)
    const flipProfile = () => {
        setFlipped(!flipped)
        setTimeout(() => {
            setProfile(profile === info.formalImage ? info.childhoodImage : info.formalImage)
        }, 500)
    }

    const memberImageStyle = image => {
        return {
            width: '100%',
            height: '373px',
            backgroundImage: `url('${image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '12px',
            transition: 'transform 1s linear',
        }
    }
    return (
        <Link to={info.informalHandle}>
            <div styleName="styles.card"
                onMouseLeave={flipProfile}
                onMouseEnter={flipProfile}
                style={{
                    position: 'relative', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none', transition: 'transform 1s linear',
                }}>
                <div styleName="styles.roleSVG" style={{
                    position: 'absolute',
                    transform: flipped ? 'rotateY(180deg)' : 'none',
                }}>
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
                <div styleName="styles.memberProfile" style={{ transform: flipped ? 'rotateY(-180deg)' : 'none', }}>
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
                <div style={memberImageStyle(profile)}>
                </div>
            </div>
        </Link>
    )
}

export default MemberCard
