import React from 'react'
import { Grid, Container, Icon } from 'semantic-ui-react'

import styles from '../../../../css/sections/info/info-section.css'

const InfoSection = ({ location, contact, social, about }) => (
  <div styleName="styles.container">
    <Container>
      <Grid columns={2} padded="vertically" stackable reversed="mobile">
        <Grid.Column>
          <div>
            <h5>
              <div styleName="styles.footer-text">CONTACT US</div>
            </h5>
            <p styleName="styles.footer-text-content">
              {location.address}
              <br />
              {location.city},
              <br />
              {location.state}, {location.country} - {' '}
              {location.postalCode}
            </p>
          </div>
          <br />
          <p>
            <Icon inverted name="phone" />
            <span styleName="styles.f-link">{contact.primaryPhoneNumber}</span>
          </p>
          <p>
            <Icon inverted name="envelope" />
            <span styleName="styles.f-link">{contact.emailAddress}</span>
          </p>
          <div>
            {social.links.map(profile => (
              <span styleName="styles.social-links" key={profile.id}>
                <Icon
                  key={profile.id}
                  title={profile.siteName}
                  name={profile.siteLogo}
                  onClick={() => window.open(profile.url)}
                  fitted
                />
              </span>
            ))}
          </div>
        </Grid.Column>
        <Grid.Column>
          <div>
            <h5>
              <div styleName="styles.footer-text">About</div>
            </h5>
            <p styleName="styles.footer-text-content">{about.description}</p>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  </div>
)

export default InfoSection
