import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <Link to={`/post/${this.props.post.id}`}>
        <article>
          <div>
            <div>
              <h3>{title}</h3>
              <p>{this.props.post.content}</p>
              <p>By {this.props.post.author.name}</p>
            </div>
          </div>
        </article>
      </Link>
    )
  }
}
