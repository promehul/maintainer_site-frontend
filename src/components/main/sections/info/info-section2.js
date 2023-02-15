import React from 'react'
import { Grid, Container, Icon } from 'semantic-ui-react'

import styles from '../../../../css/sections/info/info-section2.css'

const InfoSection = ({ location, contact, social, about }) => (
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
          <div className='iconsBar'>
            <div styleName="styles.icons">
              <Icon inverted name="phone" flipped="horizontally"><a href='contact.primaryPhoneNumber'/></Icon>
            </div>
            <div styleName="styles.icons">
              <Icon inverted name="envelope"><a href='contact.emailAddress'/></Icon>
            </div>
            <div styleName="styles.icons">
              <Icon inverted name="map marker alternate"><a href='location.address'/></Icon>
            </div>
          </div>
        </Grid.Column>
        
        <Grid.Column computer={5} tablet={5} mobile={5} styleName="styles.column2">
          <div>
            <h5>
              <div styleName="styles.footer-text">Follow Us</div>
            </h5>
            <div>
              {console.log(social)}
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
    <hr/>
    </Container>
  </div>
)

export default InfoSection
