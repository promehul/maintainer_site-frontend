import React from 'react'
import { Grid, Container, Icon } from 'semantic-ui-react'
import { Popup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import styles from '../../../../css/sections/info/info-section.css'

const InfoSection = ({ location, contact, social, about }) => {

  const popUpStyle = {
    fontWeight: '500', fontFamily: 'Archivo', fontSize: '1.5rem', color: "#95A6C4", backgroundColor: 'transparent', border: 'none', padding: 0
  }

  return (
    <div styleName="styles.container">
      <Container>
        <Grid columns={2} padded="vertically" stackable>
          <Grid.Column computer={9} tablet={10} mobile={9}>
            <div>
              <h5>
                <div styleName="styles.footer-text">Information Management Group</div>
              </h5>
              <p styleName="styles.footer-text-content">
                We are a student group, which cultivates technical innovation and drives the development of software systems for IITR.
              </p>
            </div>
            <br />
            <div styleName='styles.iconsBar'>
              <Popup
                position='top center'
                content="Copied to Clipboard"
                on="click"
                closeOnTriggerMouseLeave="true"
                hideOnScroll
                trigger={
                  <div style={{ width: '2rem' }}>
                    <Popup
                      position='bottom center'
                      content={contact.primaryPhoneNumber}
                      basic
                      style={popUpStyle}
                      on="hover"
                      trigger={
                        <div styleName="styles.icons" onClick={() => showCopiedPopup(contact.primaryPhoneNumber)} >
                          <Icon styleName="styles.icon" inverted name="phone" flipped="horizontally" />
                        </div>
                      }
                    />
                  </div>
                }
              />
              <Popup
                position='top center'
                content="Copied to Clipboard"
                on="click"
                closeOnTriggerMouseLeave="true"
                hideOnScroll
                trigger={
                  <div style={{ width: '2rem' }}>
                    <Popup
                      position='bottom center'
                      content={contact.emailAddress}
                      basic
                      style={popUpStyle}
                      on="hover"
                      trigger={
                        <div styleName="styles.icons" onClick={() => showCopiedPopup(contact.emailAddress)} >
                          <Icon styleName="styles.icon" inverted name="envelope" />
                        </div>
                      }
                    />
                  </div>
                }
              />
              <Popup
                position='top center'
                content="Copied to Clipboard"
                on="click"
                closeOnTriggerMouseLeave="true"
                hideOnScroll
                trigger={
                  <div style={{ width: '2rem' }}>
                    <Popup
                      position='bottom center'
                      content={location.address}
                      basic
                      style={popUpStyle}
                      on="hover"
                      trigger={
                        <div styleName="styles.icons" onClick={() => showCopiedPopup(location.address)} >
                          <Icon styleName="styles.icon" inverted name="map marker alternate" />
                        </div>
                      }
                    />
                  </div>
                }
              />
            </div>
          </Grid.Column>

          <Grid.Column computer={5} tablet={5} mobile={5} styleName="styles.column2">
            <div>
              <h5>
                <div styleName="styles.footer-text">Follow Us</div>
              </h5>
              <div>
                {social.links.map(profile => (
                  <div styleName="styles.icons2" key={profile.id}>
                    <Icon
                      key={profile.id}
                      title={profile.siteName}
                      name={profile.siteLogo}
                      onClick={() => window.open(profile.url)}
                      fitted
                    />
                  </div>
                ))}
              </div>
            </div>
          </Grid.Column>
        </Grid>
        <hr />
      </Container>
    </div>
  )
}

export default InfoSection
