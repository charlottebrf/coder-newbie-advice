import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import '../components/layout.css'
import HomeLink from '../components/homeLink'
import NewbieLinks from '../components/newbieLinks'

class MeetupsTemplate extends React.Component {
  render() {
    const meetups = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = meetups.excerpt;

    console.log(meetups);

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${meetups.frontmatter.country} | ${siteTitle}`}
        />


        <h1 className={""}>{meetups.frontmatter.country}</h1>
        <h2>{meetups.frontmatter.city}</h2>
        <h1>{meetups.frontmatter.kind}</h1>

        <div id="markdown" dangerouslySetInnerHTML={{ __html: meetups.html }} />

        <NewbieLinks description={"Learn in person"} url={"/learn-in-person/"}/>
        <br/>
        <br/>
        <HomeLink/>
      </Layout>
    )
  }
}

export default MeetupsTemplate

export const pageQuery = graphql`
  query MeetupsBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
          html
          excerpt(pruneLength: 140)
          fields {
            slug
          }
          frontmatter {
            kind
            country
            city
          }
    }
  }
`
