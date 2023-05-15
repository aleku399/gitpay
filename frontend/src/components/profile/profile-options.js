import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import {
  Avatar,
  Typography,
  Button,
  CardActions,
  CardContent,
  withStyles,
  Chip,
} from '@material-ui/core'

import {
  Person
} from '@material-ui/icons'

import { Card, CardList, CardMedia } from './ProfileStyles'
import WelcomeUser from '../session/welcome-user'
import ImportIssueButton from '../topbar/import-issue';
import ImportIssueDialog from '../topbar/import-issue-dialog';

const organizationIcon = require('../../images/icons/noun_project management_3063542.svg')
const toolsIcon = require('../../images/icons/noun_project management_3063515.svg')
const preferencesIcon = require('../../images/icons/noun_project management_3063532.svg')
const generalSettingsIcon = require('../../images/icons/noun_project management_3063521.svg')
const taskIcon = require('../../images/icons/noun_project management_3063547.svg')
const configIcon = require('../../images/icons/noun_project management_3063514.svg')
const paymentsIcon = require('../../images/icons/noun_project management_3063535.svg')

const styles = theme => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class ProfileOptions extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      openAddIssue: false
    }
  }

  handleAddIssueClick = () => {
    this.setState({ openAddIssue: true })
  }

  onHandleCreateTask = (props) => {
    this.props.onCreateTask(props)
    this.setState({ openAddIssue: false })
  }


  render () {
    const { classes, user, history } = this.props
    return (
      <Fragment>
        { window.localStorage.getItem('firstLogin') === 'true' && (
          <WelcomeUser />
        ) }
        <div>
          <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 20 } }>
            <div>
              <Typography style={ { marginTop: 10 } } variant='h5' component='h3'>
                <FormattedMessage
                  id='account.profile.welcome.headline'
                  defaultMessage='Welcome to Gitpay!'
                />
              </Typography>
              <Typography component='p'>
                <FormattedMessage
                  id='account.profile.welcome.description'
                  defaultMessage='This is the first steps to start to work with Gitpay'
                />
              </Typography>
            </div>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{
                marginRight: 10,
                paddingRight: 15,
                borderRight: '1px solid #ccc',
              }}>
                <ImportIssueButton
                  onAddIssueClick={ this.handleAddIssueClick}
                />
                <ImportIssueDialog
                  open={ this.state.openAddIssue }
                  onClose={ () => this.setState({ openAddIssue: false }) }
                  styles={classes}
                  onCreate={this.onHandleCreateTask}
                  user={user}
                  history={history}
                />
              </div>
              <div>
                <Button
                  onClick={ this.handleMenu }
                  variant='text'
                  size='small'
                  color='primary'
                  id='account-menu'
                  style={ {
                    display: 'flex',
                    justifyContent: 'space-between',
                  } }
                >
                  { user.picture_url
                    ? <Avatar
                      alt={ user.username || '' }
                      src={ user.picture_url }
                    />
                    : <Avatar alt={ user.username || '' } src=''>
                      { user.username ? nameInitials(user.username) : <Person /> }
                    </Avatar>
                  }
                  <div style={ { textAlign: 'left', marginLeft: 10, color: '#1c1c1f' } }>
                    <Typography variant='body2' color='text'>
                      { user.username }
                    </Typography>
                    <Typography variant='body4' style={ { fontSize: 10, color: '#666' } }>
                      { user.email }
                    </Typography>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <CardList>
            { user.Types && user.Types.map(t => t.name).includes('contributor') &&
              <Card>
                <FormattedMessage
                  id='account.profile.issues.caption'
                  defaultMessage='Issues'
                >
                  { msg => <CardMedia image={ taskIcon } title={ msg } /> }
                </FormattedMessage>
                <CardContent>
                  <Typography variant='h6'>
                    <FormattedMessage
                      id='account.profile.issues.headline'
                      defaultMessage='Issues'
                    />
                  </Typography>
                  <Typography variant='body2'>
                    <FormattedMessage
                      id='account.profile.issues.description'
                      defaultMessage='Check the issues available for you'
                    />
                  </Typography>
                </CardContent>
                <CardActions className={ classes.cardActions }>
                  <Button size='small' color='primary'>
                    <Link to={ '/profile/tasks' }>
                      <FormattedMessage
                        id='account.profile.issues.link.tasks'
                        defaultMessage='See issues'
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            }
            { user.Types && user.Types.map(t => t.name).includes('maintainer') &&
              <Card>
                <FormattedMessage
                  id='account.profile.tasks.mine.caption'
                  defaultMessage='Issues'
                >
                  { msg => <CardMedia image={ organizationIcon } title={ msg } /> }
                </FormattedMessage>
                <CardContent>
                  <Typography variant='h6'>
                    <FormattedMessage
                      id='account.profile.tasks.mine.headline'
                      defaultMessage='Organizations'
                    />
                  </Typography>
                  <Typography variant='body2'>
                    <FormattedMessage
                      id='account.profile.tasks.mine.description'
                      defaultMessage='Organizations created from issues'
                    />
                  </Typography>
                </CardContent>
                <CardActions className={ classes.cardActions }>
                  <Button size='small' color='primary'>
                    <Link to={ '/profile/user/orgs' }>
                      <FormattedMessage
                        id='account.profile.tasks.mine.link'
                        defaultMessage='See your organizations'
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            }
            { user.Types && (user.Types.map(t => t.name).includes('funding') || user.Types.map(t => t.name).includes('maintainer')) &&
            <Card>
              <FormattedMessage
                id='account.profile.tasks.payments.caption'
                defaultMessage='Payments'
              >
                { msg => <CardMedia image={ paymentsIcon } title={ msg } /> }
              </FormattedMessage>
              <CardContent>
                <Typography variant='h6'>
                  <FormattedMessage
                    id='account.profile.tasks.payment.paid.headline'
                    defaultMessage='Payments'
                  />
                </Typography>
                <Typography variant='body2'>
                  <FormattedMessage
                    id='account.profile.tasks.payments.desc'
                    defaultMessage='Access all your payments to any issue on Gitpay'
                  />
                </Typography>
              </CardContent>
              <CardActions className={ classes.cardActions }>
                <Button size='small' color='primary'>
                  <Link to={ '/profile/payments' }>
                    <FormattedMessage
                      id='account.profile.payments.setup'
                      defaultMessage='See your payments'
                    />
                  </Link>
                </Button>
              </CardActions>
            </Card>
            }
            { user.Types && user.Types.map(t => t.name).includes('contributor') &&
            <Card>
              <FormattedMessage
                id='account.profile.tasks.payment.caption'
                defaultMessage='Payment'
              >
                { msg => <CardMedia image={ toolsIcon } title={ msg } /> }
              </FormattedMessage>
              <CardContent>
                <Typography variant='h6'>
                  <FormattedMessage
                    id='account.profile.tasks.paid.headline'
                    defaultMessage='Bank account'
                  />
                </Typography>
                <Typography variant='body2'>
                  <FormattedMessage
                    id='account.profile.tasks.bank.desc'
                    defaultMessage='Register your bank accounts'
                  />
                </Typography>
              </CardContent>
              <CardActions className={ classes.cardActions }>
                <Button size='small' color='primary'>
                  <Link to={ '/profile/payment-options' }>
                    <FormattedMessage
                      id='account.profile.tasks.account.setup'
                      defaultMessage='Setup bank account'
                    />
                  </Link>
                </Button>
              </CardActions>
            </Card>
            }
            { user.Types && user.Types.map(t => t.name).includes('contributor') &&
            <Card>
              <CardMedia image={ preferencesIcon } title='Contemplative Reptile' />
              <CardContent>
                <Typography variant='h6'>
                  <FormattedMessage
                    id='account.profile.skills.headline'
                    defaultMessage='Skills'
                  />
                </Typography>
                <Typography variant='body2'>
                  <FormattedMessage
                    id='account.profile.skill.preferences.description'
                    defaultMessage='Setup your skill to receive matching offers'
                  />
                </Typography>
              </CardContent>
              <CardActions className={ classes.cardActions }>
                <Button size='small' color='primary'>
                  <Link to='/profile/preferences'>
                    <FormattedMessage
                      id='account.profile.skills.link'
                      defaultMessage='Setup skills preferences'
                    />
                  </Link>
                </Button>
              </CardActions>
            </Card>
            }
            <Card>
              <CardMedia image={ configIcon } title='Contemplative Reptile' />
              <CardContent>
                <Typography variant='h6'>
                  <FormattedMessage
                    id='account.profile.roles.headline'
                    defaultMessage='Roles'
                  />
                </Typography>
                <Typography variant='body2'>
                  <FormattedMessage
                    id='account.profile.roles.description'
                    defaultMessage='Set your roles to define your capatibilities on Gitpay'
                  />
                </Typography>
              </CardContent>
              <CardActions className={ classes.cardActions }>
                <Button size='small' color='primary'>
                  <Link to='/profile/roles'>
                    <FormattedMessage
                      id='account.profile.roles.link'
                      defaultMessage='Setup your roles on Gitpay'
                    />
                  </Link>
                </Button>
              </CardActions>
            </Card>
            <Card>
              <CardMedia image={ generalSettingsIcon } title='General settings' />
              <CardContent>
                <Typography variant='h6'>
                  <FormattedMessage
                    id='account.profile.settings.headline'
                    defaultMessage='General settings'
                  />
                </Typography>
                <Typography variant='body2'>
                  <FormattedMessage
                    id='account.profile.settings.description'
                    defaultMessage='Set your general settings on Gitpay to setups your account'
                  />
                </Typography>
              </CardContent>
              <CardActions className={ classes.cardActions }>
                <Button size='small' color='primary'>
                  <Link to='/profile/settings'>
                    <FormattedMessage
                      id='account.profile.settings.link'
                      defaultMessage='Your general settings'
                    />
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </CardList>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(withStyles(styles)(ProfileOptions))
