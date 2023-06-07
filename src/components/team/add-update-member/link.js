import React from 'react'
import { Icon, Modal, Image, Button, Form } from 'semantic-ui-react'

import style from '../../../css/team/add-member-details.css'

import { BlogModal } from '../../../containers/member/memberFormLoader'

class LinkData extends React.Component {
    constructor(props) {
        super(props)
        this.deleteIconRef = React.createRef()
        this.state = {
            open: false,
        }
    }

    handleImageClick = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
        }))
    }

    handleDelete = () => {
        this.props.onDelete(this.deleteIconRef.current.props.id)
    }

    render() {
        const { data, linkListOptions } = this.props
        const iconText = !data.url ? data.toLowerCase().replace(/\s/g, '') : ''

        return (
            <div >
                <div styleName="style.socialBox">
                    <div styleName="style.iconBox" onClick={this.handleImageClick}>
                        <Icon
                            style={{ ...(data.hasOwnProperty('guid') && { cursor: 'pointer' }) }}
                            styleName="style.icons"
                            site={data.hasOwnProperty('site') ? data.site : 'med'}
                            name={linkListOptions[data.hasOwnProperty('site') ? data.site : 'med']}
                        />
                    </div>
                    <span styleName="style.url">
                        <a target="_blank" href={data.url ? data.url : data}>
                            <p styleName="style.link">{data.url || data}</p>
                        </a>
                    </span>
                    <div styleName="style.delBox">
                        <Icon
                            styleName="style.deleteIcon"
                            id={data.hasOwnProperty('guid') ? data.guid : data.id}
                            name="trash alternate outline"
                            onClick={this.handleDelete}
                            ref={this.deleteIconRef}
                        />
                    </div>
                </div>
                <div>
                    {data.hasOwnProperty('guid') && (
                        <BlogModal onOpen={this.handleImageClick} onClose={this.handleImageClick} open={this.state.open} data={data} />
                    )}
                </div>
            </div>
        )
    }
}

export default LinkData
