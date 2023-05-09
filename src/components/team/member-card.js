import React from 'react'
import { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { memberImageStyle } from '../../consts'
import { urlStaticBase } from '../../urls'

import styles from '../../css/team/member.css'

const MemberCard = ({ info, roleOptions, designationOptions, linkOptions, member }) => {

    const [flipped, setFlipped] = useState(false)
    const [firstChange, setFirstChange] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isBluff, setIsBluff] = useState(false)
    const [profile, setProfile] = useState(info.formalImage)

    const flipProfile = () => {
        setIsBluff(false)
        setFirstChange(true);
        if (isAnimating) {
            setIsBluff(true)
        }
        setFlipped(!flipped)
    }

    useEffect(() => {
        if (firstChange && !isBluff) {
            setIsAnimating(true);
            const timeoutId = setTimeout(() => {
                setProfile((prevProfile) =>
                    prevProfile === info.formalImage ? info.childhoodImage : info.formalImage
                );
                setIsAnimating(false)
            }, 500);
            return () => clearTimeout(timeoutId)
        } else if (isBluff) {
            setIsAnimating(false)
        }
    }, [flipped, isBluff])

    return (
        <div styleName="styles.card"
            onMouseLeave={flipProfile}
            onMouseEnter={flipProfile}
            style={{
                position: 'relative', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none', transition: 'transform 1s linear',
            }}>
            <Link to={"../" + member + "/" + info.informalHandle}>
                {!flipped && (
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
                )}
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
                <div style={memberImageStyle(profile)} />
            </Link>
        </div>
    )
}

export default MemberCard
