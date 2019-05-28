import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class CreatePage extends Component {
  state = {
    title: '',
    content: '',
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlePost}>
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
          <textarea
            cols={50}
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="Content"
            rows={8}
            value={this.state.content}
          />
          <input
            disabled={!this.state.content || !this.state.title}
            type="submit"
            value="Create"
          />
          <a onClick={this.props.history.goBack}>or cancel</a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, content } = this.state
    await this.props.createDraftMutation({
      variables: { title, content },
    })
    this.props.history.replace('/drafts')
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createDraftMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreatePage)

export default withRouter(CreatePageWithMutation)
