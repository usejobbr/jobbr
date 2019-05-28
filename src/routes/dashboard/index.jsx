import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import { Tabs, Tab } from '../../components/Tabs'
import Dialog from '../../components/Dialog'
import { Button, IconButton, ButtonGroup as BtnGroup } from '../../components/Button'
import { toast } from '../../components/Toast'
import { H1, H2, H3 } from '../../components/Typography'

const Content = styled.div`
  padding: 32px 80px;
`
const Section = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`
const ButtonGroup = styled(BtnGroup)`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`

class Dashboard extends React.Component {
  state = { open: false }

  render() {
    const { open } = this.state

    return (
      <Page
        title="Welcome Center"
        actions={
          <>
            <IconButton name="filter" onClick={() => this.setState({ open: true })} />
            <IconButton name="email-outline" onClick={() => this.setState({ open: true })} />
          </>
        }
      >
        <Tabs>
          <Tab label="Style Guide" value="style-guide">
            <Section>
              <Content>
                <H2>Small Buttons</H2>
                <H3>Secondary</H3>
                <ButtonGroup>
                  <Button size="sm" onClick={() => this.setState({ open: true })}>
                    Open Dialog
                  </Button>
                  <Button
                    type="info"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    type="success"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    type="warning"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    type="error"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
                <p />
                <H3>Primary</H3>
                <ButtonGroup>
                  <Button primary size="sm" onClick={() => this.setState({ open: true })}>
                    Open Dialog
                  </Button>
                  <Button
                    primary
                    type="info"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    primary
                    type="success"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    primary
                    type="warning"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    primary
                    type="error"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
              </Content>
            </Section>
            <Section>
              <Content>
                <H2>Medium Buttons (default)</H2>
                <H3>Secondary</H3>
                <ButtonGroup>
                  <Button onClick={() => this.setState({ open: true })}>Open Dialog</Button>
                  <Button
                    type="info"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    type="success"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    type="warning"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    type="error"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
                <p />
                <H3>Primary</H3>
                <ButtonGroup>
                  <Button primary onClick={() => this.setState({ open: true })}>
                    Open Dialog
                  </Button>
                  <Button
                    primary
                    type="info"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    primary
                    type="success"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    primary
                    type="warning"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    primary
                    type="error"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
              </Content>
            </Section>
            <Section>
              <Content>
                <H2>Large Buttons</H2>
                <H3>Secondary</H3>
                <ButtonGroup>
                  <Button size="lg" onClick={() => this.setState({ open: true })}>
                    Open Dialog
                  </Button>
                  <Button
                    type="info"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    type="success"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    type="warning"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    type="error"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
                <p />
                <H3>Primary</H3>
                <ButtonGroup>
                  <Button primary size="lg" onClick={() => this.setState({ open: true })}>
                    Open Dialog
                  </Button>
                  <Button
                    primary
                    type="info"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Your download is ready',
                        content: 'Just for your information, your download is ready. Click here to download.',
                        type: 'info',
                        onClick: () => this.setState({ open: true })
                      })
                    }
                  >
                    Make Toast
                  </Button>
                  <Button
                    primary
                    type="success"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Connection established',
                        content: 'The connection was successfully established. Click here see the results.',
                        type: 'success',
                        autoClose: false
                      })
                    }
                  >
                    Make Success Toast
                  </Button>
                  <Button
                    primary
                    type="warning"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'Save your work',
                        content: 'You need to save your work or it will be lost!',
                        type: 'warning'
                      })
                    }
                  >
                    Make Warning Toast
                  </Button>
                  <Button
                    primary
                    type="error"
                    size="lg"
                    onClick={() =>
                      toast({
                        title: 'System failure',
                        content: 'The application has crashed. Click here to view the logs.',
                        type: 'error'
                      })
                    }
                  >
                    Make Error Toast
                  </Button>
                </ButtonGroup>
                <Dialog
                  title="Are you sure?"
                  open={open}
                  onClose={() => this.setState({ open: false })}
                  actions={
                    <ButtonGroup>
                      <Button onClick={() => this.setState({ open: false })}>Cancel</Button>
                      <Button primary onClick={() => this.setState({ open: false })}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  }
                >
                  Are you sure you want to delete 4 items? This action cannot be undone.
                </Dialog>
              </Content>
            </Section>
          </Tab>
          <Tab label="Tab One" value="one">
            <div>Dashboard tab 1 here</div>
          </Tab>
          <Tab label="Tab Two" value="two">
            <div>Dashboard tab 2 here</div>
          </Tab>
          <Tab label="Tab Three" value="three">
            <div>Dashboard tab 3 here</div>
          </Tab>
        </Tabs>
      </Page>
    )
  }
}

export default Dashboard
